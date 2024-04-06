import { prefabModel } from "./../model/prefabModel";
import { audioModel } from "./../model/audioModel";
import { _decorator, Component, Prefab } from "cc";
import { loading_iAssetsSevice, loading_iAudioModel, loading_iAudioSevice, loading_iImagesModel, loading_iLoadingView, loading_iPrefabModel } from "../../../interfaces/loading_interfaces";
import { audioSevice } from "../sevice/audioSevice";
import { assetsSevice } from "../sevice/assetsSevice";
import { imageModel } from "../model/imageModel";
import { loadingView } from "../view/loadingView";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { Config } from "../../../common/Config";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import VDBaseScreen from "../../../../../../vd-framework/ui/VDBaseScreen";
import { director } from "../../../common/director";
import { HomeScreenView } from "../../home/view/HomeScreenView";
import { PATH } from "../../../common/define";
const { ccclass, property } = _decorator;

@ccclass("loadingControler")
export class loadingControler extends Component {
  @property(loadingView)
  LoadingView: loadingView = null;
  _iAudioSevice: loading_iAudioSevice = null;
  _iAssetsSevice: loading_iAssetsSevice = null;
  _iLoadingView: loading_iLoadingView = null;
  progressCurrent: number = 0;
  onLoad() {
    this.initInterfaces(audioSevice.instance, assetsSevice.instance, audioModel.instance, imageModel.instance, prefabModel.instance, this.LoadingView);
  }

  start() {
    this.RegisterEvent();
    this.loadingStart();
    this.setVersion(Config.versionGame);
  }

  initInterfaces(
    iAudioSevice: loading_iAudioSevice,
    iAssetSevice: loading_iAssetsSevice,
    iAudioModel: loading_iAudioModel,
    iImageModel: loading_iImagesModel,
    iPrefabModel: loading_iPrefabModel,
    iloadingView: loading_iLoadingView
  ) {
    this.initInterfaces_isMe(iAudioSevice, iAssetSevice, iloadingView);
    this.initInterfaces_audioSevice(iAudioModel);
    this.initInterfaces_assetsSevice(iImageModel, iPrefabModel, iAudioModel);
  }

  initInterfaces_isMe(iAudioSevice: loading_iAudioSevice, iAssetSevice: loading_iAssetsSevice, iLoadingView: loading_iLoadingView) {
    this._iAudioSevice = iAudioSevice;
    this._iAssetsSevice = iAssetSevice;
    this._iLoadingView = iLoadingView;
  }

  initInterfaces_audioSevice(iAudioModel: loading_iAudioModel) {
    this._iAudioSevice.initInterfaces(iAudioModel);
  }

  initInterfaces_assetsSevice(iImagesModel: loading_iImagesModel, iPrefabModel: loading_iPrefabModel, iAudioModel: loading_iAudioModel) {
    this._iAssetsSevice.initInterfaces(iImagesModel, iPrefabModel, iAudioModel);
  }

  RegisterEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.START_LOADING_ASSETS, this.startLoadingAsset.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.PROGRESS_BAR_POINT, this.updateLoadingView_progressBar.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.GET_PROGRESS_BAR_CURRENT, this.getProgressCurrent.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.GET_AUDIOS, this.getAudiosFromAudioSevice.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.INIT_AUDIOS, this.initAudios.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.RESOURCE_LOADING_ERR, this.showPopupMessage.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.SCREEN_CHANGE, this.screenChange.bind(this));
  }

  OffEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.START_LOADING_ASSETS, this.startLoadingAsset.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.PROGRESS_BAR_POINT, this.updateLoadingView_progressBar.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.GET_PROGRESS_BAR_CURRENT, this.getProgressCurrent.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.GET_AUDIOS, this.getAudiosFromAudioSevice.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.INIT_AUDIOS, this.initAudios.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.RESOURCE_LOADING_ERR, this.showPopupMessage.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.SCREEN_CHANGE, this.screenChange.bind(this));
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
  getProgressCurrent() {
    this.progressCurrent = this._iLoadingView.getProgressBar();
    this._iAssetsSevice.setPoint_progressBarCurrent(this.progressCurrent);
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
        director.instance.homeScreen = screen as HomeScreenView;
      },
      true
    );
  }
}
