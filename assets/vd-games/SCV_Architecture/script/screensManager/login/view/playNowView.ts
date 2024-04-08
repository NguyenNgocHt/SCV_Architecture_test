import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("playNowView")
export class playNowView extends Component {
  onClickLoginButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ON_CLICK_LOGIN_BUTTON_IN_PLAY_NOW);
  }
  onClickRegisterButton() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.ON_LICK_REGISTER_BUTTON_IN_PLAY_NOW);
  }
}
