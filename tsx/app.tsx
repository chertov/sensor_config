import * as React from 'react';
import * as ReactDOM from 'react-dom';

// document.addEventListener('DOMContentLoaded', () => {
//     const ws = new WebSocket("ws://localhost:7681", "lws-minimal");
//     try {
//         ws.onopen = () => {
//             document.getElementById("m")["disabled"] = 0;
//             document.getElementById("b")["disabled"] = 0;
//         };
//         ws.onmessage = (msg) => {
//             console.log("recv: ", msg.data);
//             const data = msg.data;
//             document.getElementById("r")["value"] = document.getElementById("r")["value"] + data + "\n";
//             document.getElementById("r").scrollTop = document.getElementById("r").scrollHeight;
//         };
//         ws.onclose = () => {
//             document.getElementById("m")["disabled"] = 1;
//             document.getElementById("b")["disabled"] = 1;
//         };
//     } catch(exception) {
//         alert("<p>Error " + exception);
//     }

//     const sendmsg = () => {
//         let val = document.getElementById("m")["value"];
//         ws.send(val);
//         document.getElementById("m")["value"] = "";
//     };
//     document.getElementById("b").addEventListener("click", sendmsg);
// });

import { Layout } from 'antd';
// import "antd/dist/antd.css";
// import "./index.css";

import { WbAttr, IWbAttr, WbAttrDefault } from './WbAttr';

const { Header, Footer, Content } = Layout;

document.addEventListener('DOMContentLoaded', () => {

    interface IAppState {
        wbAttr: IWbAttr
    }
    class App extends React.Component<{}, IAppState> {
        state = {
            wbAttr: WbAttrDefault()
        };

        render() {
            return (
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <WbAttr value={this.state.wbAttr} onChange={(wbAttr) => this.setState({wbAttr})} />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            );
        }
    }
    ReactDOM.render(<App />, document.getElementById("root"));
});