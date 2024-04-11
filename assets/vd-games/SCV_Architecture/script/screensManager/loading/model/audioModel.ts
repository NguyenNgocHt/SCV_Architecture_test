import { _decorator, Component, Node } from "cc";
import { IAudioModel_loading } from "../../../interfaces/loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("audioModel")
export class audioModel implements IAudioModel_loading {
  private soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];

  getSoundDirsData(): string[] {
    return this.soundDirs;
  }

  setSoundDirsData(soundPath: string) {
    this.soundDirs.push(soundPath);
  }
}
