import { Button } from "cc";
import { EditBox } from "cc";
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("registerView")
export class registerView extends Component {
  @property(EditBox)
  NameUser: EditBox = null;
  @property(EditBox)
  Password: EditBox = null;
  @property(EditBox)
  PasswordConfirm: EditBox = null;
    start() { }
    onClickRegister() {
        
    }
}
