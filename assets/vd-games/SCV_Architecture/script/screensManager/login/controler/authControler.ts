import { VDScrollBarDirection } from "./../../../../../../vd-framework/ui/VDScrollBar";
import { _decorator, Component, Node } from "cc";
import { loginControler } from "./loginControler";
import { registerControler } from "./registerControler";
import { authView } from "../view/authView";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { login_iAuthView } from "../../../interfaces/login_interfaces";
import { playNowControler } from "./playNowControler";
const { ccclass, property } = _decorator;

@ccclass("authControler")
export class authControler extends Component {
  @property(loginControler)
  LoginControler: loginControler = null;
  @property(registerControler)
  RegisterControler: registerControler = null;
  @property(authView)
  AuthView: authView = null;
  @property(playNowControler)
  PlayNowControler: playNowControler = null;

  private _iAuthView: login_iAuthView = null;

  start() {
    this.registerEvent();
    this.initInterfaces(this.AuthView);
  }
  initInterfaces(iAuthView: login_iAuthView) {
    this._iAuthView = iAuthView;
  }
  registerEvent() {
    //from login control
    VDEventListener.on(GAME_EVENT_DEFINE.CALL_REGISTER_NODE, this.registerNodeControl.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_LOGIN_CTR, this.playNowNodeControl.bind(this));
    //from register control
    VDEventListener.on(GAME_EVENT_DEFINE.CALL_LOGIN_NODE, this.loginNodeControl.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_REGISTER_CTR, this.playNowNodeControl.bind(this));
    //from play now control
    VDEventListener.on(GAME_EVENT_DEFINE.CALL_LOGIN_NODE_IN_PLAY_NOW_CTR, this.loginNodeControl.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.CALL_REGISTER_NODE_IN_PLAY_NOW_CTR, this.registerNodeControl.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.CALL_REGISTER_NODE, this.registerNodeControl.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.CALL_LOGIN_NODE, this.loginNodeControl.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_LOGIN_CTR, this.playNowNodeControl.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_REGISTER_CTR, this.playNowNodeControl.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.CALL_LOGIN_NODE_IN_PLAY_NOW_CTR, this.loginNodeControl.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.CALL_REGISTER_NODE_IN_PLAY_NOW_CTR, this.registerNodeControl.bind(this));
  }
  registerNodeControl(centerNode: Node) {
    this._iAuthView.NodeMovingToLeft(centerNode, this.RegisterControler.node);
  }
  loginNodeControl(centerNode: Node) {
    this._iAuthView.NodeMovingToLeft(centerNode, this.LoginControler.node);
  }
  playNowNodeControl(centerNode: Node) {
    this._iAuthView.NodeMovingToLeft(centerNode, this.PlayNowControler.node);
  }
}
