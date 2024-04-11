import { _decorator, Component, Prefab } from "cc";
import { ILoadingController, IAssetsSevice_loading, IAudioSevice_loading, ILoadingView_loading } from "../../../interfaces/loading_interfaces";
import { audioSevice } from "../sevice/audioSevice";
import { assetsSevice } from "../sevice/assetsSevice";
import { loadingView } from "../view/loadingView";
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
  _audioSevice: IAudioSevice_loading = null;
  _assetsSevice: IAssetsSevice_loading = null;
  _loadingView: ILoadingView_loading = null;
  progressCurrent: number = 0;
  onLoad() {
    this.initInterfaces(this.LoadingView);
  }

  start() {
    this.loadingStart();
    this.setVersion(Config.versionGame);
  }

  initInterfaces(iloadingView: ILoadingView_loading) {
    this.initInterfaces_isMe(iloadingView);
    this.initInterfaces_audioSevice();
    this.initInterfaces_assetsSevice();
    this.initInterfaces_loadingView();
  }
  initInterfaces_isMe(iLoadingView: ILoadingView_loading) {
    this._audioSevice = new audioSevice();
    this._assetsSevice = new assetsSevice();
    this._loadingView = iLoadingView;
  }

  initInterfaces_audioSevice() {
    this._audioSevice.initInterfaces();
  }

  initInterfaces_assetsSevice() {
    this._assetsSevice.initInterfaces(this);
  }

  initInterfaces_loadingView() {
    this._loadingView.init(this);
  }
  //controler audio sevice
  loadingStart() {
    this._audioSevice.loadingAudio();
    this.startLoadingView();
  }

  initAudios() {
    this._audioSevice.initAudio();
  }

  //controler assets sevice
  startLoadingAsset() {
    this._assetsSevice.loadingAssets();
  }

  getAudiosFromAudioSevice() {
    let audios = this._audioSevice.getAudios();
    this._assetsSevice.setAudiosData(audios);
  }

  //controler loading view
  updateLoadingView_progressBar(updatePoint: number) {
    this._loadingView.updateProgressBar(updatePoint);
  }

  showPopupMessage(message: string) {
    this._loadingView.showMessenger(message);
  }

  setVersion(versionGame: string) {
    this._loadingView.setVersion(versionGame);
  }

  startLoadingView() {
    this._loadingView.startView();
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
