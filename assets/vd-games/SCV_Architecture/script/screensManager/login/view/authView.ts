import { Tween } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
import { login_iAuthView } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("authView")
export class authView extends Component implements login_iAuthView {
  @property(Node)
  leftPos: Node = null;
  @property(Node)
  rightPos: Node = null;
  @property(Node)
  centerPos: Node = null;

  NodeMovingToLeft(CenterNode: Node, rightNode: Node) {
    tween(CenterNode)
      .to(0.8, { worldPosition: this.leftPos.getWorldPosition() }, { easing: "backInOut" })
      .call(() => {
        CenterNode.setWorldPosition(this.rightPos.getWorldPosition());
      })
      .start();
    rightNode.active = true;
    rightNode.setWorldPosition(this.rightPos.getWorldPosition());
    tween(rightNode).to(0.8, { worldPosition: this.centerPos.getWorldPosition() }, { easing: "backInOut" }).start();
  }
}
