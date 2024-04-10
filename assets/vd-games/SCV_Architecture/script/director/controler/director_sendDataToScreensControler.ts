import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
import { loginResult } from "../../dataModel/loginDataType_sendToClient";
import { playerInfo, playerInfoPackage } from "../../dataModel/playerDataType";
const { ccclass, property } = _decorator;

@ccclass("director_sendDataToScreensControler")
export class director_sendDataToScreensControler extends Component {
  private static _instance: director_sendDataToScreensControler = null!;

  public static get instance(): director_sendDataToScreensControler {
    if (this._instance == null) {
      this._instance = new director_sendDataToScreensControler();
    }

    return this._instance;
  }
  isLoginScreen: boolean = false;
  isHomeScreen: boolean = false;
  init() {
    this.registerEvent();
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_DATA_TO_SCREENS_CONTROLER, this.handleLoginResult.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_SCREENS_CONTROLER, this.handlePlayerInfo.bind(this));
  }
  handleLoginResult(loginResult: loginResult) {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, loginResult);
  }
  handlePlayerInfo(playersInfo: playerInfoPackage) {
    if (this.isLoginScreen) {
      VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL, playersInfo);
    } else if (this.isHomeScreen) {
      console.log(playersInfo);
      VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, playersInfo);
    }
  }
}
