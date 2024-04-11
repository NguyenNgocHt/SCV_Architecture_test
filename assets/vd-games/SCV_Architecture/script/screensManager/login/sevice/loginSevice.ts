import { _decorator } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import { loginResult } from "../../../dataModel/loginDataType_sendToClient";
import { ILoginController, login_iLoginSevice } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("loginSevice")
export class loginSevice implements login_iLoginSevice {
  private _loginController: ILoginController = null;

  Init(loginController: ILoginController) {
    this._loginController = loginController;
  }

  registerEvent() {
    VDEventListener.on(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_SEVICE, this.checkLoginResultData.bind(this));
  }

  offEvent() {
    VDEventListener.off(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_SEVICE, this.checkLoginResultData.bind(this));
  }

  checkLoginResultData(loginResult: loginResult) {
    let checkLoginResult = loginResult;

    if (checkLoginResult.isLogin) {
      this._loginController.switchToTheHomeScreen();
    } else {
      if (!checkLoginResult.isUserName) {
        this._loginController.setShowMsg_userNameWrong();
      }
      if (!checkLoginResult.isPassword) {
        this._loginController.setShowMsg_passwordWrong();
      }
      if (!checkLoginResult.isUserName && !checkLoginResult.isPassword) {
        this._loginController.setShowMsg_userNameAndPasswordWrong();
      }
    }
  }
}
