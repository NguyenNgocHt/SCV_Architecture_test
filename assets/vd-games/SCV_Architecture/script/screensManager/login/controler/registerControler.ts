import { IAuthController, IRegisterController, IRegisterView, login_iRegisterSevice } from "./../../../interfaces/login_interfaces";
import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { registerSevice } from "../sevice/registerSevice";
import { registerView } from "../view/registerView";
const { ccclass, property } = _decorator;

@ccclass("registerControler")
export class registerControler extends Component implements IRegisterController {
  @property(registerView)
  RegisterView: registerView = null;

  private _iRegisterSevice: login_iRegisterSevice = null;
  private _registerView: IRegisterView = null;
  private _authController: IAuthController = null;

  init(authController: IAuthController) {
    console.log("come in registerController");
    this.initInterfaces(this.RegisterView, authController);
    this._registerView.init(this);
  }

  initInterfaces(registerView: IRegisterView, authController: IAuthController) {
    this._iRegisterSevice = new registerSevice();
    this._registerView = registerView;
    this._authController = authController;
  }

  AuthCtr_LoginNode() {
    this._authController.loginNodeControl(this.node);
  }

  callToAuthCtr_CallPlayNowNode() {
    this._authController.playNowNodeControl(this.node);
  }

  checkRegisterData(msgData) {
    this._iRegisterSevice.checkRegisterData(msgData);
  }
}
