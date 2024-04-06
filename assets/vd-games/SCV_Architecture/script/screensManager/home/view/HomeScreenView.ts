import { _decorator, Node, log, sp, instantiate, Prefab } from "cc";
import VDBaseScreen from "../../../../../../vd-framework/ui/VDBaseScreen";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
const { ccclass, property } = _decorator;

@ccclass("HomeScreenView")
export class HomeScreenView extends VDBaseScreen {
  
  onClickBtnNext() {
    log(`onClickBtnNext`);
    let play_screen = VDScreenManager.instance.assetBundle.get("res/prefabs/screen/play_screen", Prefab)!;
    VDScreenManager.instance.pushScreen(play_screen, (screen: VDBaseScreen) => {}, true);
  }
}
