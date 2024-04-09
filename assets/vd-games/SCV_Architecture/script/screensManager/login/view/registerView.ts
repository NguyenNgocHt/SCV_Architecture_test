import { Button } from "cc";
import { EditBox } from "cc";
import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { registerDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
const { ccclass, property } = _decorator;

@ccclass("registerView")
export class registerView extends Component {
  @property(EditBox)
  NameUser: EditBox = null;
  @property(EditBox)
  Password: EditBox = null;
  @property(EditBox)
  PasswordConfirm: EditBox = null;
  start() {}
  onClickRegister() {
    let msgData: registerDataType_sendToSever = null;
    msgData = {
      id: 0,
      userName: this.NameUser.string,
      password: this.Password.string,
      passwordConfirm: this.PasswordConfirm.string,
    };
    console.log("msgData", msgData);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.REGISTER_DATA, msgData);
  }
  onClickLoginButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ON_CLICK_LOGIN_BUTTON);
  }
  onClickPlayNowButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_REGISTER_NODE);
  }
}
