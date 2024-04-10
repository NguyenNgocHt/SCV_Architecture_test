import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { loginResult } from "../../../dataModel/loginDataType_sendToClient";
const { ccclass, property } = _decorator;

@ccclass("login_loginModel")
export class login_loginModel {
  private static _instance: login_loginModel | null = null;

  public static get instance(): login_loginModel {
    if (this._instance == null) {
      this._instance = new login_loginModel();
    }
    return this._instance;
  }
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
