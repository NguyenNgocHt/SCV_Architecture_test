import { _decorator, Component, Node } from "cc";
import { loading_iAudioModel } from "../../../interfaces/loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("audioModel")
export class audioModel implements loading_iAudioModel {
  private static _instance: audioModel = null!;

  public static get instance(): audioModel {
    if (this._instance == null) {
      this._instance = new audioModel();
    }

    return this._instance;
  }
  private soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];

  getSoundDirsData(): string[] {
    return this.soundDirs;
  }

  setSoundDirsData(soundPath: string) {
    this.soundDirs.push(soundPath);
  }
}
