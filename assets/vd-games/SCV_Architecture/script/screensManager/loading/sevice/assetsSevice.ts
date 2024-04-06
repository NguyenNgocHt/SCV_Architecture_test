import { loading_iAudioModel, loading_iPrefabModel } from "../../../interfaces/loading_interfaces";
import { _decorator, sys, Asset, AudioClip } from "cc";
import { loading_iAssetsSevice, loading_iImagesModel } from "../../../interfaces/loading_interfaces";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import { MESENGER } from "../../../common/define";
const { ccclass, property } = _decorator;

@ccclass("assetsSevice")
export class assetsSevice implements loading_iAssetsSevice {
  private static _instance: assetsSevice = null!;

  public static get instance(): assetsSevice {
    if (this._instance == null) {
      this._instance = new assetsSevice();
    }

    return this._instance;
  }
  private _iImagesModel: loading_iImagesModel = null;
  private _iPrefabModel: loading_iPrefabModel = null;
  private _iAudioModel: loading_iAudioModel = null;

  private _audios: { [key: string]: string } = {};
  private _items: string[] = [];

  progressBar_current: number = 0;
  initInterfaces(iImagesModel: loading_iImagesModel, iPrefabModel: loading_iPrefabModel, iAudioModel: loading_iAudioModel) {
    this._iImagesModel = iImagesModel;
    this._iPrefabModel = iPrefabModel;
    this._iAudioModel = iAudioModel;
  }

  loadingAssets() {
    this._items = this.getAll_items();
    let percent = 1.0 / (this._items.length + 1);
    console.log("items", this._items);
    this._loadAsset(0, percent);
  }

  getAll_items(): string[] {
    let allItems: string[] = [];
    let imagesDirs = this._iImagesModel.getImagesDirsData();
    let audioDirs = this._iAudioModel.getSoundDirsData();
    let prefabDirs = this._iPrefabModel.getPrefabDirds();
    let prefabPaths = this._iPrefabModel.getPrefabsPath();
    allItems = audioDirs.concat(imagesDirs).concat(audioDirs).concat(prefabDirs).concat(prefabPaths);
    return allItems;
  }

  private _loadAsset(index: number, totalPercent: number) {
    if (index >= this._items.length) {
      VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.PROGRESS_BAR_POINT, 1.0);
      this._finishedLoading();
      return;
    }
    let path = this._items[index];
    console.log("_loadAsset  " + path);
    if (this._isDirectory(path)) {
      VDScreenManager.instance.assetBundle.loadDir(
        path,
        (finished, total) => {
          console.log(`items #${index}:  ${finished} / ${total} `);
          let progress = index * totalPercent + (finished / total) * totalPercent;
          VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.GET_PROGRESS_BAR_CURRENT);
          if (progress > this.progressBar_current) {
            VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.PROGRESS_BAR_POINT, progress);
          }
        },
        (err, data) => {
          if (sys.isNative && (path.endsWith("/bgm/") || path.endsWith("/sfx/"))) {
            VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.GET_AUDIOS);
            console.log(`AudioClip loaded:${JSON.stringify(this._audios)}`);
            let assets: Asset[] = data;
            for (let as of assets) {
              if (as instanceof AudioClip) {
                this._audios[`${path}${as.name}`] = `${as._nativeAsset.url}`;
              }
            }

            VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.INIT_AUDIOS);
          }
          if (!err) {
            setTimeout(() => {
              this._loadAsset(index + 1, totalPercent);
            }, 0);
          } else {
            console.log("load error  " + err + "    " + path);
            if (sys.isBrowser) {
              VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.RESOURCE_LOADING_ERR, MESENGER.RESOURCE_LOADING_ERR);
            }
          }
        }
      );
    } else {
      VDScreenManager.instance.assetBundle.load(
        path,
        (finished, total) => {
          console.log(`${finished} / ${total} `);
          let progress = index * totalPercent + (finished / total) * totalPercent;
          VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.PROGRESS_BAR_POINT, progress);
        },
        (err, data) => {
          if (!err) {
            setTimeout(() => {
              this._loadAsset(index + 1, totalPercent);
            }, 0);
          } else {
            console.log("load error  " + err + "    " + path);
            if (sys.isBrowser) {
              VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.RESOURCE_LOADING_ERR, MESENGER.RESOURCE_LOADING_ERR);
            }
          }
        }
      );
    }
  }

  private _finishedLoading() {
    console.log(`LoadingScreen: _finishedLoading`);
  }

  private _isDirectory(path: string | null): boolean {
    return path != null && typeof path == "string" && path.length > 0 && path[path.length - 1] == "/";
  }

  setPoint_progressBarCurrent(progressCurrent: number) {
    this.progressBar_current = progressCurrent;
  }

  setAudiosData(audios: { [key: string]: string }) {
    this._audios = audios;
  }
}
