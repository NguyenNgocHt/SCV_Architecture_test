import { _decorator, Component, log, assetManager, Prefab } from "cc";
import AsyncTaskMgr from "../../../vd-framework/async-task/AsyncTaskMgr";
import { VDAudioManager } from "../../../vd-framework/audio/VDAudioManager";
import VDScreenManager from "../../../vd-framework/ui/VDScreenManager";
import { Config } from "./common/Config";
import { director_SendDataToSeverControler } from "./director/controler/director_SendDataToSeverControler";
import { sendDataToSever } from "./network/sendDataToSever";
import { sever_loginModel } from "./sever/model/sever_loginModel";
import { sever_loginSevice } from "./sever/sevice/sever_loginSevice";
import { server_loginControler } from "./sever/controler/server_loginControler";
import { sever_playerControler } from "./sever/controler/sever_playerControler";
import { eventListener } from "./network/eventListener";
import { director_handleDataFromSeverModel } from "./director/model/director_handleDataFromSeverModel";
import { director_sendDataToScreensControler } from "./director/controler/director_sendDataToScreensControler";
import { sever_playerModel } from "./sever/model/sever_playerModel";
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
    director_SendDataToSeverControler.instance.registerEvent();
    director_handleDataFromSeverModel.instance.registerEvent();
    director_sendDataToScreensControler.instance.init();
    sendDataToSever.instance.registerEvent();
    // sever_loginModel.instance.registerEvent();
    sever_loginSevice.instance.init();
    server_loginControler.instance.init();
    sever_playerControler.instance.init();
    eventListener.instance.registerEvent();
    sever_playerModel.instance.registerEvent();
  }
  onDestroy() {
    VDAudioManager.instance.destroy();
    AsyncTaskMgr.instance.stop();
  }
}
