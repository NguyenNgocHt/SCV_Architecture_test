import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("loginControler")
export class loginControler extends Component {
  start() {
    this.RegisterEvent();
  }
  RegisterEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.ONCICK_REGISTRATION_BUTTON, this.callToAuthCtr_callRegisterNode.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_LOGIN_NODE, this.callToAuthCtr_callPlayNowNode.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.LOGIN_DATA, this.sendLoginDtaToSever.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.ONCICK_REGISTRATION_BUTTON, this.callToAuthCtr_callRegisterNode.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_LOGIN_NODE, this.callToAuthCtr_callPlayNowNode.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.LOGIN_DATA, this.sendLoginDtaToSever.bind(this));
  }
  callToAuthCtr_callRegisterNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_REGISTER_NODE, this.node);
  }
  callToAuthCtr_callPlayNowNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_LOGIN_CTR, this.node);
  }
  sendLoginDtaToSever(data) {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_DATA_TO_DIRECTOR_FROM_LOGIN, data);
  }
}
