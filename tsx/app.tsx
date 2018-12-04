import * as React from 'react';
import * as ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
    const ws = new WebSocket("ws://localhost:7681", "lws-minimal");
    try {
        ws.onopen = () => {
            document.getElementById("m")["disabled"] = 0;
            document.getElementById("b")["disabled"] = 0;
        };
        ws.onmessage = (msg) => {
            console.log("recv: ", msg.data);
            const data = msg.data;
            document.getElementById("r")["value"] = document.getElementById("r")["value"] + data + "\n";
            document.getElementById("r").scrollTop = document.getElementById("r").scrollHeight;
        };
        ws.onclose = () => {
            document.getElementById("m")["disabled"] = 1;
            document.getElementById("b")["disabled"] = 1;
        };
    } catch(exception) {
        alert("<p>Error " + exception);
    }

    const sendmsg = () => {
        let val = document.getElementById("m")["value"];
        ws.send(val);
        document.getElementById("m")["value"] = "";
    };
    document.getElementById("b").addEventListener("click", sendmsg);
});
