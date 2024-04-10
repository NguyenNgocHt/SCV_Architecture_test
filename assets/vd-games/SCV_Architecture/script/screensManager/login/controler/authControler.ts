import { registerDataType_sendToSever } from "./../../../dataModel/loginDataType_sendToSever";
import { VDScrollBarDirection } from "./../../../../../../vd-framework/ui/VDScrollBar";
import { _decorator, Component, Node } from "cc";
import { loginControler } from "./loginControler";
import { registerControler } from "./registerControler";
import { authView } from "../view/authView";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { IAuthController, IRegisterController, login_iAuthView } from "../../../interfaces/login_interfaces";
import { playNowControler } from "./playNowControler";
const { ccclass, property } = _decorator;

@ccclass("authControler")
export class authControler extends Component implements IAuthController {
  @property(loginControler)
  LoginControler: loginControler = null;

  @property(registerControler)
  RegisterControler: registerControler = null;

  @property(authView)
  AuthView: authView = null;

  @property(playNowControler)
  PlayNowControler: playNowControler = null;

  private _iAuthView: login_iAuthView = null;
  private _registerController: IRegisterController = null;

  start() {
    this.registerEvent();
    this.initInterfaces(this.AuthView, this.RegisterControler);
    this.initRegisterController();
  }
  initInterfaces(iAuthView: login_iAuthView, registerControler: registerControler) {
    this._iAuthView = iAuthView;
    this._registerController = registerControler;
  }
  initRegisterController() {
    this._registerController.init(this);
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
