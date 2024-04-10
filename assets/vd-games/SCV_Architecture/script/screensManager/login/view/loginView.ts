import { _decorator, Component, Node } from "cc";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { loginDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
import { EditBox } from "cc";
import { CLIENT_COMMAN_ID_OP } from "../../../common/define";
import { Label } from "cc";
import { login_iLoginView } from "../../../interfaces/login_interfaces";
import { TriggerEventType } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loginView")
export class loginView extends Component implements login_iLoginView {
  @property(EditBox)
  UserName: EditBox = null;
  @property(EditBox)
  Password: EditBox = null;
  @property(Label)
  NotifyForUserName: Label = null;
  @property(Label)
  NotifyForPassword: Label = null;
  onClickResgistrationButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ONCICK_REGISTRATION_BUTTON);
  }
  onClickPlayNowButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_LOGIN_NODE);
  }
  onClickLoginButton() {
    let loginData: loginDataType_sendToSever = null;
    loginData = {
      id: CLIENT_COMMAN_ID_OP.LOGIN_ID,
      userName: this.UserName.string,
      password: this.Password.string,
    };
    console.log("login data", loginData);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.LOGIN_DATA, loginData);
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
