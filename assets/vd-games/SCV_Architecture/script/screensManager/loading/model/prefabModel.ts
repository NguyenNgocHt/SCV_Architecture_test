import { _decorator, Component, Node } from "cc";
import { loading_iPrefabModel } from "../../../interfaces/loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("prefabModel")
export class prefabModel implements loading_iPrefabModel {
  
  _prefabDirs = ["res/anims/prefabs/", "res/prefabs/popup/"];
  _prefabs = ["res/prefabs/transition/transition_cloud", "res/prefabs/screen/home_screen", "res/prefabs/screen/login_screen", "res/prefabs/screen/play_screen"];

  getPrefabDirds(): string[] {
    return this._prefabDirs;
  }
  getPrefabsPath(): string[] {
    return this._prefabs;
  }
  setPrefabDirs(prefabDir: string) {
    this._prefabDirs.push(prefabDir);
  }
  setPrefabsPath(prefabPath: string) {
    this._prefabs.push(prefabPath);
  }
}
