import { _decorator, Component, Node } from "cc";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { loginDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
import { EditBox } from "cc";
import { CLIENT_COMMAN_ID_OP } from "../../../common/define";
const { ccclass, property } = _decorator;

@ccclass("loginView")
export class loginView extends Component {
  @property(EditBox)
  UserName: EditBox = null;
  @property(EditBox)
  Password: EditBox = null;
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
}
