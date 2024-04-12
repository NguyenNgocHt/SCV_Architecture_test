import { _decorator } from "cc";
import { EventListener } from "../../../../../../vd-framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import { loginResult } from "../../../dataModel/loginDataType_sendToClient";
import { ILoginModel_login, ILoginSevice_login } from "../../../interfaces/login_interfaces";
import { loginSevice } from "../sevice/loginSevice";
const { ccclass, property } = _decorator;

@ccclass("login_loginModel")
export class login_loginModel implements ILoginModel_login {
  _loginResult: loginResult = null;
  _loginSevice: ILoginSevice_login = null;

  init(loginService: ILoginSevice_login) {
    this._loginSevice = loginService;
    this.registerEvent();
  }
  registerEvent() {
    EventListener.on(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, this.handleLoginResult.bind(this));
  }

  offEvent() {
    EventListener.off(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, this.handleLoginResult.bind(this));
  }

  handleLoginResult(loginResult: loginResult) {
    this.setLoginResul(loginResult);

    this._loginSevice.checkLoginResultData(loginResult);
  }

  setLoginResul(loginResult: loginResult) {
    this._loginResult = loginResult;

    console.log("login result", this._loginResult);
  }

  getLoginResult(): loginResult {
    return this._loginResult;
  }
}
