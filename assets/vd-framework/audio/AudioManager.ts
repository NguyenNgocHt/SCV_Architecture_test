import { _decorator, sys } from "cc";
import { BaseAudio } from "./BaseAudio";
import { AudioNativeManager } from "./AudioNativeManager";
import { AudioWebManager } from "./AudioWebManager";

export class AudioManager {
  public static readonly ENABLE_MUSIC = "enableBackgroundMusic";
  public static readonly ENABLE_SFX = "enableSound";

  protected static _instance: AudioManager;
  static get instance() {
    if (AudioManager._instance) {
      return AudioManager._instance;
    }
    AudioManager._instance = new AudioManager();
    return AudioManager._instance;
  }

  constructor() {
    if (this._isWebAudio()) {
      this._audioManager = new AudioWebManager();
    } else {
      this._audioManager = new AudioNativeManager();
    }
  }

  private _isWebAudio() {
    return sys.isBrowser;
  }

  private _audioManager: BaseAudio;

  get isMutingMusic() {
    return this._audioManager.isMutingMusic;
  }
  set isMutingMusic(value) {
    this._audioManager.isMutingMusic = value;
  }

  get isMutingEffect() {
    return this._audioManager.isMutingEffect;
  }
  set isMutingEffect(value) {
    this._audioManager.isMutingEffect = value;
  }

  get musicVolume() {
    return this._audioManager.musicVolume;
  }
  set musicVolume(value) {
    this._audioManager.musicVolume = value;
  }

  get effectVolume() {
    return this._audioManager.effectVolume;
  }
  set effectVolume(value) {
    this._audioManager.effectVolume = value;
  }

  init(audio: any) {
    this._audioManager.init(audio);
  }

  playBGM(name: string, fade: boolean = false) {
    this._audioManager.playBGM(name, fade);
  }

  pauseBGM(fade = true) {
    this._audioManager.pauseBGM(fade);
  }

  resumeBGM(fade = true) {
    this._audioManager.resumeBGM(fade);
  }

  playClip(name: string, loop: boolean = false, resumeBGM: boolean = true, callback: VoidFunction | null = null) {
    this._audioManager.playClip(name, loop, resumeBGM, callback);
  }

  stopClip(resumeBGM: boolean = true, callback: VoidFunction | null = null) {
    this._audioManager.stopClip(resumeBGM, callback);
  }

  playEffect(name: string, loop: boolean = false, callback: VoidFunction | null = null): string | null {
    return this._audioManager.playEffect(name, loop, callback);
  }

  stopEffect(sfxId: string, fade: boolean = false): boolean {
    return this._audioManager.stopEffect(sfxId, fade);
  }

  stopEffectByName(name: string, fade: boolean = false): boolean {
    return this._audioManager.stopEffectByName(name, fade);
  }

  resumeEffect(sfxId: string, fade: boolean = false) {
    this._audioManager.resumeEffect(sfxId, fade);
  }

  pauseEffect(sfxId: string, fade: boolean = false) {
    this._audioManager.pauseEffect(sfxId, fade);
  }

  stopAllEffects(fade: boolean = false) {
    this._audioManager.stopAllEffects(fade);
  }

  pauseAllEffects(fade: boolean = false) {
    this._audioManager.pauseAllEffects(fade);
  }

  resumeAllEffects(fade: boolean = false) {
    this._audioManager.resumeAllEffects(fade);
  }

  destroy() {
    this._audioManager && this._audioManager.destroy();
    AudioManager._instance = null;
  }
}
