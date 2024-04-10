import { _decorator } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { loginResult } from "../../../dataModel/loginDataType_sendToClient";
import { login_iLoginModel } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("login_loginModel")
export class login_loginModel implements login_iLoginModel {
  _loginResult: loginResult = null;
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, this.handleLoginResult.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, this.handleLoginResult.bind(this));
  }
  handleLoginResult(loginResult: loginResult) {
    this.setLoginResul(loginResult);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_SEVICE, loginResult);
  }
  setLoginResul(loginResult: loginResult) {
    this._loginResult = loginResult;
    console.log("login result", this._loginResult);
  }
  getLoginResult(): loginResult {
    return this._loginResult;
  }
}
