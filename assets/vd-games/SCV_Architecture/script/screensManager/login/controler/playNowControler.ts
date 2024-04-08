import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("playNowControler")
export class playNowControler extends Component {
  start() {
    this.registerEvent();
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.ON_CLICK_LOGIN_BUTTON_IN_PLAY_NOW, this.callToAuthCtr_callLoginNode.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.ON_LICK_REGISTER_BUTTON_IN_PLAY_NOW, this.callToAuthCtr_callRegisterNode.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.ON_CLICK_LOGIN_BUTTON_IN_PLAY_NOW, this.callToAuthCtr_callLoginNode.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.ON_LICK_REGISTER_BUTTON_IN_PLAY_NOW, this.callToAuthCtr_callRegisterNode.bind(this));
  }
  callToAuthCtr_callLoginNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_LOGIN_NODE_IN_PLAY_NOW_CTR, this.node);
  }
  callToAuthCtr_callRegisterNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_REGISTER_NODE_IN_PLAY_NOW_CTR, this.node);
  }
}
