import { _decorator, Component, Node } from "cc";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
const { ccclass, property } = _decorator;

@ccclass("loginView")
export class loginView extends Component {
  onClickResgistrationButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ONCICK_REGISTRATION_BUTTON);
  }
  onClickPlayNowButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_LOGIN_NODE);
  }
}
