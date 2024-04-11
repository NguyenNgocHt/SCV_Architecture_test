import { _decorator, Component } from "cc";
import { IPlayNowController, IPlayNowView } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("playNowView")
export class playNowView extends Component implements IPlayNowView {
  private _playNowController: IPlayNowController = null;

  init(playNowController: IPlayNowController) {
    this._playNowController = playNowController;
  }

  onClickLoginButton() {
    this._playNowController.callMoveLoginNode();
  }
  
  onClickRegisterButton() {
    this._playNowController.callMoveRegisterNode();
  }
}
