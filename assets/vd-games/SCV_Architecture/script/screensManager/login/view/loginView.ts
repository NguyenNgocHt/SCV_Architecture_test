import { _decorator, Component, Node } from "cc";
import { loginDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
import { EditBox } from "cc";
import { CLIENT_COMMAN_ID_OP } from "../../../common/define";
import { Label } from "cc";
import { ILoginController, ILoginView_login } from "../../../interfaces/login_interfaces";
import { TriggerEventType } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loginView")
export class loginView extends Component implements ILoginView_login {
  @property(EditBox)
  UserName: EditBox = null;
  @property(EditBox)
  Password: EditBox = null;
  @property(Label)
  NotifyForUserName: Label = null;
  @property(Label)
  NotifyForPassword: Label = null;

  private _loginController: ILoginController = null;

  init(loginControler: ILoginController) {
    this._loginController = loginControler;
  }

  onClickResgistrationButton() {
    this._loginController.callMoveRegisterNode();
  }

  onClickPlayNowButton() {
    this._loginController.callMovePlayNowNode();
  }

  onClickLoginButton() {
    let loginData: loginDataType_sendToSever = null;
    loginData = {
      id: CLIENT_COMMAN_ID_OP.LOGIN_ID,
      userName: this.UserName.string,
      password: this.Password.string,
    };
    console.log("login data", loginData);
    this._loginController.sendLoginDtaToSever(loginData);
  }

  showMessenger_userNameWrong(msg: string) {
    this.NotifyForUserName.string = msg;
  }

  showMessenger_passwordWrong(msg: string) {
    this.NotifyForPassword.string = msg;
  }

  resetAllMessenger() {
    this.NotifyForPassword.string = "";
    this.NotifyForUserName.string = "";
  }
}
