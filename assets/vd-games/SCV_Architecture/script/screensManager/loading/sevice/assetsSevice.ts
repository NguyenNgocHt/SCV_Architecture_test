import { ILoadingController, IAudioModel_loading, IPrefabModel_loading } from "../../../interfaces/loading_interfaces";
import { _decorator, sys, Asset, AudioClip } from "cc";
import { IAssetsSevice_loading, IImageModel_loading } from "../../../interfaces/loading_interfaces";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import { MESENGER } from "../../../common/define";
import { imageModel } from "../model/imageModel";
import { prefabModel } from "../model/prefabModel";
import { audioModel } from "../model/audioModel";
const { ccclass, property } = _decorator;

@ccclass("assetsSevice")
export class assetsSevice implements IAssetsSevice_loading {
  private _imagesModel: IImageModel_loading = null;
  private _prefabModel: IPrefabModel_loading = null;
  private _audioModel: IAudioModel_loading = null;
  private _loadingController: ILoadingController = null;

  private _audios: { [key: string]: string } = {};
  private _items: string[] = [];

  progressBar_current: number = 0;

  initInterfaces(loadingControler: ILoadingController) {
    this._imagesModel = new imageModel();
    this._prefabModel = new prefabModel();
    this._audioModel = new audioModel();

    this._loadingController = loadingControler;
  }

  loadingAssets() {
    this._items = this.getAllItems();

    let percent = 1.0 / (this._items.length + 1);
    console.log("items", this._items);

    this._loadAsset(0, percent);
  }

  getAllItems(): string[] {
    let allItems: string[] = [];
    let imagesDirs = this._imagesModel.getImagesDirsData();

    let audioDirs = this._audioModel.getSoundDirsData();

    let prefabDirs = this._prefabModel.getPrefabDirds();

    let prefabPaths = this._prefabModel.getPrefabsPath();

    allItems = audioDirs.concat(imagesDirs).concat(audioDirs).concat(prefabDirs).concat(prefabPaths);
    return allItems;
  }

  private _loadAsset(index: number, totalPercent: number) {
    if (index >= this._items.length) {
      this._loadingController.updateLoadingView_progressBar(1.0);

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
          if (progress > this.progressBar_current) {
            this.progressBar_current = progress;
            this._loadingController.updateLoadingView_progressBar(progress);
          }
        },
        (err, data) => {
          if (sys.isNative && (path.endsWith("/bgm/") || path.endsWith("/sfx/"))) {
            this._loadingController.getAudiosFromAudioSevice();

            console.log(`AudioClip loaded:${JSON.stringify(this._audios)}`);
            let assets: Asset[] = data;
            for (let as of assets) {
              if (as instanceof AudioClip) {
                this._audios[`${path}${as.name}`] = `${as._nativeAsset.url}`;
              }
            }

            this._loadingController.initAudios();
          }
          if (!err) {
            this._loadAsset(index + 1, totalPercent);
          } else {
            console.log("load error  " + err + "    " + path);
            if (sys.isBrowser) {
              this._loadingController.showPopupMessage(MESENGER.RESOURCE_LOADING_ERR);
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

          this._loadingController.updateLoadingView_progressBar(progress);
        },
        (err, data) => {
          if (!err) {
            this._loadAsset(index + 1, totalPercent);
          } else {
            console.log("load error  " + err + "    " + path);
            if (sys.isBrowser) {
              this._loadingController.showPopupMessage(MESENGER.RESOURCE_LOADING_ERR);
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

  setProgressBarCurrent(progressCurrent: number) {
    this.progressBar_current = progressCurrent;
  }

  setAudiosData(audios: { [key: string]: string }) {
    this._audios = audios;
  }
}
