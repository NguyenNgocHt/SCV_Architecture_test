import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { IPlayNowController, IPlayNowView } from "../../../interfaces/login_interfaces";
import { playNowControler } from "../controler/playNowControler";
const { ccclass, property } = _decorator;

@ccclass("playNowView")
export class playNowView extends Component implements IPlayNowView {
  private _playNowController: IPlayNowController = null;

  init(playNowController: IPlayNowController) {
    this._playNowController = playNowController;
  }
  onClickLoginButton() {
    this._playNowController.callToAuthCtr_callLoginNode();
  }
  onClickRegisterButton() {
    this._playNowController.callToAuthCtr_callRegisterNode();
  }
}
