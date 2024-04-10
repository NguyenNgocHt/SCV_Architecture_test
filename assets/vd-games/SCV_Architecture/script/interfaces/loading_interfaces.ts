export interface loading_iAudioModel {
  getSoundDirsData(): string[];
  setSoundDirsData(soundPath: string): void;
}
export interface loading_iAudioSevice {
  initInterfaces(): void;
  loadingAudio(): void;
  loadAudioWeb();
  initAudio();
  getAudios(): { [key: string]: string };
}
export interface loading_iAssetsSevice {
  initInterfaces(loadingControler: ILoadingController);
  loadingAssets(): void;
  setProgressBarCurrent(progressCurrent: number): void;
  setAudiosData(audios: { [key: string]: string });
}
export interface loading_iLoadingView {
  init(loadingController: ILoadingController);
  startView(): void;
  updateProgressBar(updatePoint: number): void;
  getProgressBar(): number;
  showMessenger(mesenger: string): void;
  setVersion(version: string): void;
}
export interface loading_iImagesModel {
  getImagesDirsData(): string[];
  setImagesDirsData(imagePath: string): void;
}
export interface loading_iPrefabModel {
  getPrefabDirds(): string[];
  getPrefabsPath(): string[];
  setPrefabDirs(prefabDir: string): void;
  setPrefabsPath(prefabPath: string): void;
}
export interface ILoadingController {
  initAudios(): void;
  startLoadingAsset(): void;
  getAudiosFromAudioSevice(): void;
  updateLoadingView_progressBar(updatePoint: number): void;
  showPopupMessage(message: string);
  screenChange();
}
