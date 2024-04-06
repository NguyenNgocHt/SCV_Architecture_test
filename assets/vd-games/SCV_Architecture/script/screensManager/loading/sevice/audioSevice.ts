import { VDAudioManager } from "./../../../../../../vd-framework/audio/VDAudioManager";
import { _decorator, Component, Node, AudioClip } from "cc";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import { assetManager } from "cc";
import VDLocalDataManager from "../../../../../../vd-framework/common/VDLocalDataManager";
import { loading_iAudioModel, loading_iAudioSevice } from "../../../interfaces/loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("audioSevice")
export class audioSevice implements loading_iAudioSevice {
  private static _instance: audioSevice = null!;

  public static get instance(): audioSevice {
    if (this._instance == null) {
      this._instance = new audioSevice();
    }

    return this._instance;
  }

  private _audios: { [key: string]: string } = {};
  private _iAudioModel: loading_iAudioModel = null;

  initInterfaces(iAudioModel: loading_iAudioModel) {
    this._iAudioModel = iAudioModel;
  }
  loadingAudio() {
    console.log("loading Audio start");
    this.loadAudioWeb();
  }
  loadAudioWeb() {
    let soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];
    soundDirs.forEach((soundsPath) => {
      const sounds = VDScreenManager.instance.assetBundle.getDirWithPath(soundsPath, AudioClip);
      sounds.forEach((sound) => {
        if (this._audios[`${sound.path}`]) return;
        const nativeUrl = assetManager.utils.getUrlWithUuid(sound.uuid, { isNative: true, nativeExt: ".mp3" });
        console.log("sound", sound.path, sound.uuid, nativeUrl);
        console.log("sound", assetManager.utils.getUrlWithUuid(sound.uuid, { isNative: false }));
        this._audios[`${sound.path}`] = nativeUrl;
      });
    });

    this.initAudio();
  }
  initAudio() {
    VDAudioManager.instance.init(this._audios);

    let isMuteMusic = VDLocalDataManager.getBoolean(VDAudioManager.ENABLE_MUSIC, false);
    let isMuteSfx = VDLocalDataManager.getBoolean(VDAudioManager.ENABLE_SFX, false);

    VDAudioManager.instance.isMutingMusic = isMuteMusic;
    VDAudioManager.instance.isMutingEffect = isMuteSfx;
  }
  getAudios(): { [key: string]: string } {
    return this._audios;
  }
}
