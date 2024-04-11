import { registerDataType_sendToSever } from "./../../../dataModel/loginDataType_sendToSever";
import { VDScrollBarDirection } from "./../../../../../../vd-framework/ui/VDScrollBar";
import { _decorator, Component, Node } from "cc";
import { loginControler } from "./loginControler";
import { registerControler } from "./registerControler";
import { authView } from "../view/authView";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { IAuthController, ILoginController, IPlayNowController, IRegisterController, login_iAuthView } from "../../../interfaces/login_interfaces";
import { playNowControler } from "./playNowControler";
const { ccclass, property } = _decorator;

@ccclass("authControler")
export class authControler extends Component implements IAuthController {
  @property(loginControler)
  LoginController: loginControler = null;

  @property(registerControler)
  RegisterController: registerControler = null;

  @property(authView)
  AuthView: authView = null;

  @property(playNowControler)
  PlayNowControler: playNowControler = null;

  private _iAuthView: login_iAuthView = null;
  private _registerController: IRegisterController = null;
  private _playNowController: IPlayNowController = null;
  private _loginControler: ILoginController = null;

  start() {
    this.initInterfaces(this.AuthView, this.RegisterController, this.PlayNowControler, this.LoginController);

    this.init_registerController();

    this.init_playNowController();

    this.init_loginController();
  }
  initInterfaces(iAuthView: login_iAuthView, registerControler: IRegisterController, playNowController: IPlayNowController, loginController: ILoginController) {
    this._iAuthView = iAuthView;
    this._registerController = registerControler;
    this._playNowController = playNowController;
    this._loginControler = loginController;
  }
  init_registerController() {
    this._registerController.init(this);
  }
  init_playNowController() {
    this._playNowController.init(this);
  }
  init_loginController() {
    this._loginControler.init(this);
  }

  registerNodeControl(centerNode: Node) {
    this._iAuthView.NodeMovingToLeft(centerNode, this.RegisterController.node);
  }
  loginNodeControl(centerNode: Node) {
    this._iAuthView.NodeMovingToLeft(centerNode, this.LoginController.node);
  }
  playNowNodeControl(centerNode: Node) {
    this._iAuthView.NodeMovingToLeft(centerNode, this.PlayNowControler.node);
  }
}
