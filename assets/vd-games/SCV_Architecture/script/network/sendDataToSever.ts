import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT } from "./networkDefine";
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
    VDEventListener.on(GAME_EVENT.SEND_LOGIN_NODE_DATA_FROM_DIRECTOR, this.sendDataToSever_loginNode.bind(this));
    VDEventListener.on(GAME_EVENT.SEND_PLAYER_IN_HOME_NODE_DATA_FROM_DIRECTOR, this.sendDataToSever_playerInHome.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT.SEND_LOGIN_NODE_DATA_FROM_DIRECTOR, this.sendDataToSever_loginNode.bind(this));
    VDEventListener.off(GAME_EVENT.SEND_PLAYER_IN_HOME_NODE_DATA_FROM_DIRECTOR, this.sendDataToSever_playerInHome.bind(this));
  }
  sendDataToSever_loginNode(data) {
    let msg = JSON.stringify(data);
    console.log("msg", msg);
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_NODE_DATA_TO_SEVER, msg);
  }
  sendDataToSever_playerInHome(data) {
    let msg = JSON.stringify(data);
    console.log("msg", msg);
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_IN_HOME_DATA_TO_SEVER, msg);
  }
}
