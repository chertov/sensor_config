#include "main.h"

#include <lws_config.h>
#include <libwebsockets.h>

#include <string.h>
#include <signal.h>

struct msg {
    void *payload;
    size_t len;
};

/* one of these is created for each client connecting to us */
struct per_session_data__minimal {
    struct per_session_data__minimal *pss_list;
    struct lws *wsi;
    int last; /* the last message number we sent */
};

/* one of these is created for each vhost our protocol is used with */
struct per_vhost_data__minimal {
    struct lws_context *context;
    struct lws_vhost *vhost;
    const struct lws_protocols *protocol;
    struct per_session_data__minimal *pss_list; /* linked-list of live pss*/
    struct msg amsg; /* the one pending message... */
    int current; /* the current message number we are caching */
};

/* destroys the message when everyone has had a copy of it */
static void __minimal_destroy_message(void *_msg) {
    struct msg *msg = _msg;
    free(msg->payload);
    msg->payload = NULL;
    msg->len = 0;
}

static int callback_minimal(struct lws *wsi, enum lws_callback_reasons reason, void *user, void *in, size_t len) {
    struct per_session_data__minimal *pss = (struct per_session_data__minimal *)user;
    struct per_vhost_data__minimal *vhd = (struct per_vhost_data__minimal *) lws_protocol_vh_priv_get(lws_get_vhost(wsi), lws_get_protocol(wsi));
    int m;

    switch (reason) {
        case LWS_CALLBACK_PROTOCOL_INIT:
            vhd = lws_protocol_vh_priv_zalloc(lws_get_vhost(wsi), lws_get_protocol(wsi), sizeof(struct per_vhost_data__minimal));
            vhd->context = lws_get_context(wsi);
            vhd->protocol = lws_get_protocol(wsi);
            vhd->vhost = lws_get_vhost(wsi);
            break;
        case LWS_CALLBACK_ESTABLISHED:
            lws_ll_fwd_insert(pss, pss_list, vhd->pss_list);
            pss->wsi = wsi;
            pss->last = vhd->current;
            break;
        case LWS_CALLBACK_CLOSED:
            lws_ll_fwd_remove(struct per_session_data__minimal, pss_list, pss, vhd->pss_list);
            break;
        case LWS_CALLBACK_SERVER_WRITEABLE:
            if (!vhd->amsg.payload) break;
            if (pss->last == vhd->current) break;


            // base


            m = lws_write(wsi, ((unsigned char *)vhd->amsg.payload) + LWS_PRE, vhd->amsg.len, LWS_WRITE_TEXT);
            if (m < (int)vhd->amsg.len) { lwsl_err("ERROR %d writing to ws\n", m); return -1; }
            pss->last = vhd->current;
            break;
        case LWS_CALLBACK_RECEIVE:
            if (vhd->amsg.payload) __minimal_destroy_message(&vhd->amsg);

            // int decoded_len = 0;
            // char *decoded = decode(in, len, &decoded_len);
            // _lws_log(LLL_NOTICE, "msg: %i     %s \n", decoded_len, decoded);
//            char *msg = malloc(len);
//            memcpy(msg, in, len);
//            _lws_log(LLL_NOTICE, "msg: %i  %s \n", len, msg);
//            int alloc_length = Base64decode_len(msg);
//            char *decoded = malloc(alloc_length);
//            int decoded_data_length = Base64decode(decoded, msg);
//            free(msg);
//
//            _lws_log(LLL_NOTICE, "alloc_length: %i\n", alloc_length);
//            _lws_log(LLL_NOTICE, "data_length: %i\n", decoded_data_length);
//            _lws_log(LLL_NOTICE, "decoded[data_length]: %i\n", decoded[decoded_data_length]);
//            _lws_log(LLL_NOTICE, "msg: %i %i      %s \n", len, alloc_length, decoded);
//            free(decoded);

//            int reply_len = 0;
//            char *encoded = encode(decoded, decoded_len, &reply_len);
//            free(decoded);
//            _lws_log(LLL_NOTICE, "encoded: %s \n", encoded);
//            _lws_log(LLL_NOTICE, "reply_len: %i \n", reply_len);
//            reply_len -=1;

            size_t reply_len = len;

            vhd->amsg.len = reply_len;
            vhd->amsg.payload = malloc(LWS_PRE + reply_len);
            if (!vhd->amsg.payload) { lwsl_user("OOM: dropping\n"); break; }
            memcpy((char *)vhd->amsg.payload + LWS_PRE, in, reply_len);

            vhd->current++;
            lws_callback_on_writable(wsi);
            break;
        default:
            break;
    }
    return 0;
}




static struct lws_protocols protocols[] = {
        { "http", lws_callback_http_dummy, 0, 0 },
        { "lws-minimal", callback_minimal, sizeof(struct per_session_data__minimal), 128, 0, NULL, 0 },
        { NULL, NULL, 0, 0 } /* terminator */
};
static int interrupted;
static const struct lws_http_mount mount = {
        /* .mount_next */		NULL,		/* linked-list "next" */
        /* .mountpoint */		"/",		/* mountpoint URL */
        /* .origin */			"./pub",  /* serve from dir */
        /* .def */			"index.html",	/* default filename */
        /* .protocol */			NULL,
        /* .cgienv */			NULL,
        /* .extra_mimetypes */		NULL,
        /* .interpret */		NULL,
        /* .cgi_timeout */		0,
        /* .cache_max_age */		0,
        /* .auth_mask */		0,
        /* .cache_reusable */		0,
        /* .cache_revalidate */		0,
        /* .cache_intermediaries */	0,
        /* .origin_protocol */		LWSMPRO_FILE,	/* files in a dir */
        /* .mountpoint_len */		1,		/* char count */
        /* .basic_auth_login_file */	NULL,
};

void sigint_handler(int sig) { interrupted = 1; }

int main(int argc, const char **argv) {
    struct lws_context_creation_info info;
    struct lws_context *context;
    const char *p;

    int n = 0, logs = LLL_USER | LLL_ERR | LLL_WARN | LLL_NOTICE
    /* for LLL_ verbosity above NOTICE to be built into lws,
     * lws must have been configured and built with
     * -DCMAKE_BUILD_TYPE=DEBUG instead of =RELEASE */
    /* | LLL_INFO */ /* | LLL_PARSER */ /* | LLL_HEADER */
    /* | LLL_EXT */ /* | LLL_CLIENT */ /* | LLL_LATENCY */
    /* | LLL_DEBUG */;

    signal(SIGINT, sigint_handler);
    if ((p = lws_cmdline_option(argc, argv, "-d"))) logs = atoi(p);

    lws_set_log_level(logs, NULL);
    lwsl_user("LWS minimal ws server | visit http://localhost:7681 (-s = use TLS / https)\n");

    memset(&info, 0, sizeof info); /* otherwise uninitialized garbage */
    info.port = 7681;
    info.mounts = &mount;
    info.protocols = protocols;
    info.vhost_name = "localhost";
    info.ws_ping_pong_interval = 10;
    info.options = 0; // LWS_SERVER_OPTION_HTTP_HEADERS_SECURITY_BEST_PRACTICES_ENFORCE;

    context = lws_create_context(&info);
    if (!context) { lwsl_err("lws init failed\n"); return 1; }
    while (n >= 0 && !interrupted) n = lws_service(context, 1000);
    lws_context_destroy(context);
    return 0;
}
