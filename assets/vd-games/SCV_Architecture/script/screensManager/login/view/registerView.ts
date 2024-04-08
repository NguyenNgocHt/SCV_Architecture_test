import { Button } from "cc";
import { EditBox } from "cc";
import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
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
  onClickRegister() {}
  onClickLoginButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ON_CLICK_LOGIN_BUTTON);
  }
  onClickPlayNowButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_REGISTER_NODE);
  }
}
