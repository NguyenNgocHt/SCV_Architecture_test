import { _decorator, Component, sys, Label } from "cc";
import { loading_iLoadingView } from "../../../interfaces/loading_interfaces";
import { ProgressBar } from "cc";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { PATH } from "../../../common/define";
import VDBasePopup from "../../../../../../vd-framework/ui/VDBasePopup";
import { PopupNotify } from "../../../popups/PopupNotify";
const { ccclass, property } = _decorator;

@ccclass("loadingView")
export class loadingView extends Component implements loading_iLoadingView {
  private static _instance: loadingView = null!;

  public static get instance(): loadingView {
    if (this._instance == null) {
      this._instance = new loadingView();
    }
    return this._instance;
  }
  @property(ProgressBar)
  loadingProgress: ProgressBar = null!;

  @property(Label)
  lbVersion: Label = null!;

  startView() {
    this.loadingProgress.progress = 0;
    this.updateProgressBar(0);
    VDScreenManager.instance.assetBundle.load("res/prefabs/popup/popup_notify", (err, data) => {
      if (!err) {
        VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.START_LOADING_ASSETS);
      } else {
        console.log("load error  " + err + " _loadAsset");
        if (sys.isBrowser) {
          alert("Không có kết nối, vui lòng thử lại");
        }
      }
    });
  }
  updateProgressBar(updatePoint: number) {
    this.loadingProgress.progress = updatePoint;
  }
  getProgressBar(): number {
    return this.loadingProgress.progress;
  }
  showMessenger(mesenger: string) {
    VDScreenManager.instance.showPopupFromPrefabName(
      PATH.POPUP_NOTIFY,
      (popup: VDBasePopup) => {
        let popupDisplay = popup as PopupNotify;
        popupDisplay.setupPopup(mesenger, [
          () => {
            VDScreenManager.instance.hidePopup(true);
            VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.START_LOADING_ASSETS);
          },
          () => {
            VDScreenManager.instance.hidePopup(true);
          },
        ]);
      },
      true,
      true,
      false
    );
  }

  setVersion(version: string) {
    this.lbVersion && (this.lbVersion.string = "v" + version);
  }
  onClick_screenChange() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SCREEN_CHANGE);
  }
}
