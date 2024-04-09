import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "./networkDefine";
const { ccclass, property } = _decorator;

@ccclass("sendDataToSever")
export class sendDataToSever {
  private static _instance: sendDataToSever = null!;

  public static get instance(): sendDataToSever {
    if (this._instance == null) {
      this._instance = new sendDataToSever();
    }

    return this._instance;
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_NODE_DATA_FROM_DIRECTOR, this.sendDataToSever.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_NODE_DATA_FROM_DIRECTOR, this.sendDataToSever.bind(this));
  }
  sendDataToSever(data) {
    let msg = JSON.stringify(data);
    console.log("msg", msg);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_NODE_DATA_TO_SEVER, msg);
  }
}
