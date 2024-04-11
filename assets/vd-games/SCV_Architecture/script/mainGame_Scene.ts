import { _decorator, Component, log, assetManager, Prefab } from "cc";
import AsyncTaskMgr from "../../../vd-framework/async-task/AsyncTaskMgr";
import { VDAudioManager } from "../../../vd-framework/audio/VDAudioManager";
import VDScreenManager from "../../../vd-framework/ui/VDScreenManager";
import { Config } from "./common/Config";
import { Path } from "./common/Path";
const { ccclass, property } = _decorator;

@ccclass("mainGame_Scene")
export class mainGame_Scene extends Component {
  onLoad() {
    this.registerEvent();
    log("@ dm_Scene: onLoad  !!!");
    let bundle = assetManager.getBundle("bundle_" + Config.GAME_NAME);
    if (bundle) {
      this.node.addComponent(VDScreenManager);

      VDScreenManager.instance.assetBundle = bundle;
      VDScreenManager.instance.setupCommon();

      bundle.load(Path.LOADING_SCREEN, Prefab, (error, prefab) => {
        if (error) {
          log(`bundle.load: ${error}`);
        } else {
          log("load loading sucess");
          // VDScreenManager.instance.initWithRootScreen(prefab);
          VDScreenManager.instance.pushScreen(prefab, (screen) => {
            log("pushScreen " + screen.name + " success!");
          });
        }
      });
    }
  }
  registerEvent() {}
  onDestroy() {
    VDAudioManager.instance.destroy();
    AsyncTaskMgr.instance.stop();
  }
}
