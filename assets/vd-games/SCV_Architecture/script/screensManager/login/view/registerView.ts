import { EditBox } from "cc";
import { _decorator, Component, Node } from "cc";
import { registerDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
import { IRegisterController, IRegisterView } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("registerView")
export class registerView extends Component implements IRegisterView {
  @property(EditBox)
  NameUser: EditBox = null;
  @property(EditBox)
  Password: EditBox = null;
  @property(EditBox)
  PasswordConfirm: EditBox = null;

  private _registerController: IRegisterController = null;

  init(registerControl: IRegisterController) {
    this._registerController = registerControl;
  }

  onClickRegister() {
    let msgData: registerDataType_sendToSever = null;
    msgData = {
      id: 0,
      userName: this.NameUser.string,
      password: this.Password.string,

      passwordConfirm: this.PasswordConfirm.string,
    };
    console.log("msgData", msgData);
    this._registerController.checkRegisterData(msgData);
  }

  onClickLoginButton() {
    this._registerController.callMoveLoginNode();
  }

  onClickPlayNowButton() {
    this._registerController.callMovePlayNowNode();
  }
}
