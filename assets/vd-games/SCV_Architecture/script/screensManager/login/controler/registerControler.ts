import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("registerControler")
export class registerControler extends Component {
  start() {
    this.registerEvent();
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.ON_CLICK_LOGIN_BUTTON, this.callToAuthCtr_callLoginNode.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_REGISTER_NODE, this.callToAuthCtr_CallPlayNowNode.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.ON_CLICK_LOGIN_BUTTON, this.callToAuthCtr_callLoginNode.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_REGISTER_NODE, this.callToAuthCtr_CallPlayNowNode.bind(this));
  }
  callToAuthCtr_callLoginNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_LOGIN_NODE, this.node);
  }
  callToAuthCtr_CallPlayNowNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_REGISTER_CTR, this.node);
  }
}
