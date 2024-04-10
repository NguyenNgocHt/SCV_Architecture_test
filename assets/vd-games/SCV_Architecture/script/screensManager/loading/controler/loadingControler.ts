import { prefabModel } from "./../model/prefabModel";
import { audioModel } from "./../model/audioModel";
import { _decorator, Component, Prefab } from "cc";
import {
  ILoadingController,
  loading_iAssetsSevice,
  loading_iAudioModel,
  loading_iAudioSevice,
  loading_iImagesModel,
  loading_iLoadingView,
  loading_iPrefabModel,
} from "../../../interfaces/loading_interfaces";
import { audioSevice } from "../sevice/audioSevice";
import { assetsSevice } from "../sevice/assetsSevice";
import { imageModel } from "../model/imageModel";
import { loadingView } from "../view/loadingView";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { Config } from "../../../common/Config";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import VDBaseScreen from "../../../../../../vd-framework/ui/VDBaseScreen";
import { PATH } from "../../../common/define";
import { director_sendDataToScreensControler } from "../../../director/controler/director_sendDataToScreensControler";
const { ccclass, property } = _decorator;

@ccclass("loadingControler")
export class loadingControler extends Component implements ILoadingController {
  @property(loadingView)
  LoadingView: loadingView = null;
  _iAudioSevice: loading_iAudioSevice = null;
  _iAssetsSevice: loading_iAssetsSevice = null;
  _iLoadingView: loading_iLoadingView = null;
  progressCurrent: number = 0;
  onLoad() {
    this.initInterfaces(this.LoadingView);
  }

  start() {
    this.loadingStart();
    this.setVersion(Config.versionGame);
  }

  initInterfaces(iloadingView: loading_iLoadingView) {
    this.initInterfaces_isMe(iloadingView);
    this.initInterfaces_audioSevice();
    this.initInterfaces_assetsSevice();
    this.initInterfaces_loadingView();
  }
  initInterfaces_isMe(iLoadingView: loading_iLoadingView) {
    this._iAudioSevice = new audioSevice();
    this._iAssetsSevice = new assetsSevice();
    this._iLoadingView = iLoadingView;
  }

  initInterfaces_audioSevice() {
    this._iAudioSevice.initInterfaces();
  }

  initInterfaces_assetsSevice() {
    this._iAssetsSevice.initInterfaces(this);
  }

  initInterfaces_loadingView() {
    this._iLoadingView.init(this);
  }
  //controler audio sevice
  loadingStart() {
    this._iAudioSevice.loadingAudio();
    this.startLoadingView();
  }

  initAudios() {
    this._iAudioSevice.initAudio();
  }

  //controler assets sevice
  startLoadingAsset() {
    this._iAssetsSevice.loadingAssets();
  }

  getAudiosFromAudioSevice() {
    let audios = this._iAudioSevice.getAudios();
    this._iAssetsSevice.setAudiosData(audios);
  }

  //controler loading view
  updateLoadingView_progressBar(updatePoint: number) {
    this._iLoadingView.updateProgressBar(updatePoint);
  }

  showPopupMessage(message: string) {
    this._iLoadingView.showMessenger(message);
  }

  setVersion(versionGame: string) {
    this._iLoadingView.setVersion(versionGame);
  }

  startLoadingView() {
    this._iLoadingView.startView();
  }

  screenChange() {
    let play_screen = VDScreenManager.instance.assetBundle.get(PATH.LOGIN_SCREEN, Prefab)!;
    VDScreenManager.instance.pushScreen(
      play_screen,
      (screen: VDBaseScreen) => {
        director_sendDataToScreensControler.instance.isLoginScreen = true;
      },
      true
    );
  }
}
