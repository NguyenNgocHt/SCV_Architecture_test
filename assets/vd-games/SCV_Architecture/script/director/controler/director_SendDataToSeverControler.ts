import { _decorator } from "cc";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT } from "../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("director_SendDataToSeverControler")
export class director_SendDataToSeverControler {
  private static _instance: director_SendDataToSeverControler = null!;

  public static get instance(): director_SendDataToSeverControler {
    if (this._instance == null) {
      this._instance = new director_SendDataToSeverControler();
    }

    return this._instance;
  }
  registerEvent() {
    this.registerEventFromLoginScreen();
  }
  registerEventFromLoginScreen() {
    VDEventListener.on(GAME_EVENT.SEND_DATA_TO_DIRECTOR_FROM_LOGIN, this.sendDataToSever_fromLogin.bind(this));
    VDEventListener.on(GAME_EVENT.HOME_SEND_PLAYER_ID_TO_DIRECTOR, this.sendDataToSever_FromPlayerInHome.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT.SEND_DATA_TO_DIRECTOR_FROM_LOGIN, this.sendDataToSever_fromLogin.bind(this));
    VDEventListener.off(GAME_EVENT.HOME_SEND_PLAYER_ID_TO_DIRECTOR, this.sendDataToSever_FromPlayerInHome.bind(this));
  }
  //from login
  sendDataToSever_fromLogin(data) {
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_NODE_DATA_FROM_DIRECTOR, data);
  }
  sendDataToSever_FromPlayerInHome(data) {
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_IN_HOME_NODE_DATA_FROM_DIRECTOR, data);
  }
}
