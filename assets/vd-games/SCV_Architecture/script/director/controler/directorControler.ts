import { _decorator, Component, Node } from "cc";
import { HomeScreenView } from "../../screensManager/home/view/HomeScreenView";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("directorControler")
export class directorControler {
  private static _instance: directorControler = null!;

  public static get instance(): directorControler {
    if (this._instance == null) {
      this._instance = new directorControler();
    }

    return this._instance;
  }
  homeScreen: HomeScreenView | null = null;
  registerEvent() {
    this.registerEventFromLoginScreen();
  }
  registerEventFromLoginScreen() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_DATA_TO_DIRECTOR_FROM_LOGIN, this.sendDataToSever_fromLogin.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_DATA_TO_DIRECTOR_FROM_LOGIN, this.sendDataToSever_fromLogin.bind(this));
  }
  //from login
  sendDataToSever_fromLogin(data) {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_NODE_DATA_FROM_DIRECTOR, data);
  }
}
