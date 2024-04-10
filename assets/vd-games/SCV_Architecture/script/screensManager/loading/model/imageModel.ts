import { _decorator, Component, Node } from "cc";
import { RUNTIME_BASED } from "cc/env";
import { loading_iImagesModel } from "../../../interfaces/loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("imageModel")
export class imageModel implements loading_iImagesModel {
  private _imageDirs = ["res/fonts/", "res/images/bgr/", "res/images/texturePacker/avatar/"];

  getImagesDirsData(): string[] {
    return this._imageDirs;
  }

  setImagesDirsData(imagePath: string) {
    this._imageDirs.push(imagePath);
  }
}
