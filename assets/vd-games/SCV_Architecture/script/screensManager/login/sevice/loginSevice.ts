import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { loginResult } from "../../../dataModel/loginDataType_sendToClient";
import { BYTEDANCE } from "cc/env";
const { ccclass, property } = _decorator;

@ccclass("loginSevice")
export class loginSevice {
  private static _instance: loginSevice = null!;

  public static get instance(): loginSevice {
    if (this._instance == null) {
      this._instance = new loginSevice();
    }

    return this._instance;
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_SEVICE, this.checkLoginResultData.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_SEVICE, this.checkLoginResultData.bind(this));
  }
  checkLoginResultData(loginResult: loginResult) {
    console.log("come in login sevice");
    let checkLoginResult = loginResult;
    console.log("checkLoginResult", checkLoginResult);
    if (checkLoginResult.isLogin) {
      console.log("chuyển màn sang home");
      VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.LOGIN_SUCCESS);
    } else {
      if (!checkLoginResult.isUserName) {
        VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.USER_NAME_WRONG);
      }
      if (!checkLoginResult.isPassword) {
        VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.PASSWORD_WRONG);
      }
      if (!checkLoginResult.isUserName && !checkLoginResult.isPassword) {
        console.log("come in user name and pass wrong");
        VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.PASSWORD_AND_USER_NAME_WRONG);
      }
    }
  }
}
