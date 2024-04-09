import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "./networkDefine";
const { ccclass, property } = _decorator;

@ccclass("eventListener")
export class eventListener {
  private static _instance: eventListener | null = null;

  public static get instance(): eventListener {
    if (this._instance == null) {
      this._instance = new eventListener();
    }
    return this._instance;
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_CLIENT, this.getLoginData.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_CLIENT, this.getPlayerInfo.bind(this));
  }
  offEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_CLIENT, this.getLoginData.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_CLIENT, this.getPlayerInfo.bind(this));
  }
  getLoginData(data) {
    console.log(data);
  }
  getPlayerInfo(data) {
    console.log(data);
  }
}
