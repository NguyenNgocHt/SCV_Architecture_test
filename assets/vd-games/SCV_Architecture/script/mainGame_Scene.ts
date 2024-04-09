import { _decorator, Component, log, assetManager, Prefab } from "cc";
import AsyncTaskMgr from "../../../vd-framework/async-task/AsyncTaskMgr";
import { VDAudioManager } from "../../../vd-framework/audio/VDAudioManager";
import VDScreenManager from "../../../vd-framework/ui/VDScreenManager";
import { Config } from "./common/Config";
import { directorControler } from "./director/controler/directorControler";
import { sendDataToSever } from "./network/sendDataToSever";
import { sever_loginModel } from "./sever/model/sever_loginModel";
import { sever_loginSevice } from "./sever/sevice/sever_loginSevice";
import { server_loginControler } from "./sever/controler/server_loginControler";
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

      bundle.load("res/prefabs/screen/loading_screen", Prefab, (error, prefab) => {
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
  registerEvent() {
    directorControler.instance.registerEvent();
    sendDataToSever.instance.registerEvent();
    sever_loginModel.instance.registerEvent();
    sever_loginSevice.instance.init();
    server_loginControler.instance.init();
  }
  onDestroy() {
    VDAudioManager.instance.destroy();
    AsyncTaskMgr.instance.stop();
  }
}
