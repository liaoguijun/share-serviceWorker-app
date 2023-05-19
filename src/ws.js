const WEBSOCKET_URL = "wss://www.fameex.cc/swap";

// interface SubscribeData {
//   op: 'sub' | 'ping' | 'req';
//   topic?: string;
//   params?: {[key: string]: any}
// }

const heartBeatTime = 30000; // 心跳检测时间

class RealSocket {
  ws = null; // ws实例
  isReady = false; // 是否准备好
  EventObj = {}; //事件对象
  SendMsgAry = []; //发送消息队列
  TaskInterval = null;
  PingPongTime = 0;

  constructor() {
    this.init()
  }

  init() {
    this.ws = new WebSocket(WEBSOCKET_URL);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.onError.bind(this);
    this.ws.onclose = this.onClose.bind(this);
  }

  onOpen() {
    console.log('ws Open')
    console.log('this.ws', this.ws)
    // this.TaskInterval = setInterval(() => {
    //   if (this.PingPongTime && Date.now() - this.PingPongTime > heartBeatTime) {
        // this.isReady = false;

    //     this.TaskInterval && clearInterval(this.TaskInterval);
    //     return this.retry();
    //   }
    //   this.ws.send(JSON.stringify({ ping: new Date().getTime() }));
    // }, 30000);

    this.isReady = true;

    this.SendMsgAry = [];
    for (let va in this.EventObj) {
      this.SendMsgAry.push(this.EventObj[va].msg);
    }
    console.log("SendMsgAry %o", this.SendMsgAry);
    this.send();
  }

  onMessage({ data }) {
    try {
      // const json = JSON.parse(data);
      // if (json) {
      //   //ping pong 逻辑处理
      //   if (json.ping) {
      //     this.ws.send(JSON.stringify({ pong: json.ping }));
      //     this.PingPongTime = Date.now();
      //     return;
      //   }
      //   if (json.pong) {
      //     this.PingPongTime = Date.now();
      //     return;
      //   }
        console.log('获取到ws消息-------------')

        // const { noticeType, noticeInfo } = json;
        // const _event = noticeTypeMap.get(noticeType);
        // if (!_event) return;
        // if (!this.EventObj[_event]) return;
        // this.EventObj[_event](noticeInfo);
      // }
    } catch (e) {
      console.log("【catch websocket onmessage】%o", e);
    }
  }

  onError() {
    this.destroy();
    this.retry();
  }

  onClose() {
    console.log("关闭了");
  }

  retry() {
    this.init();
  }

  destroy() {
    try {
      this.TaskInterval && clearInterval(this.TaskInterval);
      this.isReady = false;
      const _ws = this.ws;
      this.ws = null;
      _ws && _ws.close();
    } catch (e) {
      console.log("【catch websocket _destroy】%o", e);
    }
  }

  send() {
    try {
      const msg = this.SendMsgAry.shift();
      if (!msg) return;
      this.ws.send(JSON.stringify(msg));
      this.send();
    } catch (e) {
      console.log("【catch websocket _send】%o", e);
    }
  }

  emit() {
    console.log('this.isReady', this.isReady)
    console.log('this.ws', this.ws)
    if (this.isReady) return this.send();
    if (this.ws) return;
    this.init();
  }

  //添加频道
  addChannel = (message, callback) => {
    const msg = { event: "addChannel", ...message };
    this.EventObj[this.getMark(msg)] = callback;
    this.EventObj[this.getMark(msg)].msg = msg;
    this.SendMsgAry.push(msg);
    this.emit();
  };

  //移除频道
  removeChannel = (message) => {
    const msg = { event: "removeChannel", ...message };
    delete this.EventObj[this.getMark(msg)];
    this.SendMsgAry.push(msg);
    this.emit();
  };

  // 生成订阅标识
  getMark(message) {
    if (!message || !message.op) return '';
    const { op, topic } = message;
    let result = [op, topic];
    return result.join("$$");
  }
}

export default new RealSocket();
