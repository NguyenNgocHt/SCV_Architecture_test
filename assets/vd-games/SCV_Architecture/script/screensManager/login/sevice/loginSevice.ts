import { _decorator } from "cc";
import { EventListener } from "../../../../../../vd-framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import { loginResult } from "../../../dataModel/loginDataType_sendToClient";
import { ILoginController, ILoginSevice_login } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("loginSevice")
export class loginSevice implements ILoginSevice_login {
  private _loginController: ILoginController = null;

  Init(loginController: ILoginController) {
    this._loginController = loginController;
  }
  
  checkLoginResultData(loginResult: loginResult) {
    let checkLoginResult = loginResult;

    if (checkLoginResult.isLogin) {
      console.log(this._loginController);
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
