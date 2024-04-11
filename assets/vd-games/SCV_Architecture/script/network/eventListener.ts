import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT } from "./networkDefine";
import { CLIENT_COMMAN_ID_IP } from "../common/define";
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
    VDEventListener.on(GAME_EVENT.SEND_LOGIN_DATA_TO_CLIENT, this.getLoginData.bind(this));
    VDEventListener.on(GAME_EVENT.SEND_PLAYER_INFO_TO_CLIENT, this.getPlayerInfo.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT.SEND_LOGIN_DATA_TO_CLIENT, this.getLoginData.bind(this));
    VDEventListener.off(GAME_EVENT.SEND_PLAYER_INFO_TO_CLIENT, this.getPlayerInfo.bind(this));
  }
  getLoginData(data) {
    console.log(data);
    let dataJson = JSON.parse(data);
    let dataID = dataJson.ID;
    console.log("dataID", dataID);
    switch (dataID) {
      case CLIENT_COMMAN_ID_IP.LOGIN_RESULT_ID:
        console.log("comme in");
        this.sendLoginResultToDirector(dataJson);
        break;
    }
  }

  getPlayerInfo(data) {
    console.log(data);
    let dataJson = JSON.parse(data);
    let dataID = dataJson.ID;
    console.log("dataID", dataID);
    switch (dataID) {
      case CLIENT_COMMAN_ID_IP.PLAYER_INFO_ID:
        console.log("comme in");
        this.sendPlayerInfoToDirector(dataJson);
        break;
    }
  }
  sendLoginResultToDirector(dataJson) {
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_RESULT_DATA_TO_DIRECTOR, dataJson);
  }
  sendPlayerInfoToDirector(dataJson) {
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_INFO_TO_DIRECTOR, dataJson);
  }
}
