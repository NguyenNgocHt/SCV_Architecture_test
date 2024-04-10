import { _decorator, Component, Node } from "cc";
import { loading_iAudioModel } from "../../../interfaces/loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("audioModel")
export class audioModel implements loading_iAudioModel {
  private soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];

  getSoundDirsData(): string[] {
    return this.soundDirs;
  }

  setSoundDirsData(soundPath: string) {
    this.soundDirs.push(soundPath);
  }
}
