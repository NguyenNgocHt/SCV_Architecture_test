import { IAuthController, IRegisterController, IRegisterView, IRegisterSevice_login } from "./../../../interfaces/login_interfaces";
import { _decorator, Component, Node } from "cc";
import { registerSevice } from "../sevice/registerSevice";
import { registerView } from "../view/registerView";
const { ccclass, property } = _decorator;

@ccclass("registerControler")
export class registerControler extends Component implements IRegisterController {
  @property(registerView)
  RegisterView: registerView = null;

  private _registerSevice: IRegisterSevice_login = null;

  private _registerView: IRegisterView = null;

  private _authController: IAuthController = null;

  init(authController: IAuthController) {
    this.initInterfaces(this.RegisterView, authController);

    this._registerView.init(this);
  }

  initInterfaces(registerView: IRegisterView, authController: IAuthController) {
    this._registerSevice = new registerSevice();

    this._registerView = registerView;
    this._authController = authController;
  }

  callMoveLoginNode() {
    this._authController.moveloginNodeToCenter(this.node);
  }

  callMovePlayNowNode() {
    this._authController.movePlayNowNodeToCenter(this.node);
  }

  checkRegisterData(msgData) {
    this._registerSevice.checkRegisterData(msgData);
  }
}
