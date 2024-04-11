import { _decorator, Component } from "cc";
import { IAuthController, IPlayNowController, IPlayNowView } from "../../../interfaces/login_interfaces";
import { playNowView } from "../view/playNowView";
const { ccclass, property } = _decorator;

@ccclass("playNowControler")
export class playNowControler extends Component implements IPlayNowController {
  @property(playNowView)
  PlayNowController: playNowView = null;

  private _playNowView: IPlayNowView = null;
  private _authController: IAuthController = null;

  init(authController: IAuthController) {
    this.setInterfaces(this.PlayNowController, authController);
    
    this._playNowView.init(this);
  }

  setInterfaces(playNowView: IPlayNowView, authController: IAuthController) {
    this._playNowView = playNowView;
    this._authController = authController;
  }
  callMoveLoginNode() {
    this._authController.loginNodeControl(this.node);
  }
  callMoveRegisterNode() {
    this._authController.registerNodeControl(this.node);
  }
}
