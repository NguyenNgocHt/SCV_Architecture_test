export interface loading_iAudioModel {
  getSoundDirsData(): string[];
  setSoundDirsData(soundPath: string): void;
}
export interface loading_iAudioSevice {
  initInterfaces(iAudioModel: loading_iAudioModel): void;
  loadingAudio(): void;
  loadAudioWeb();
  initAudio();
  getAudios(): { [key: string]: string };
}
export interface loading_iAssetsSevice {
  initInterfaces(iImagesModel: loading_iImagesModel, iPrefabModel: loading_iPrefabModel, iAudioModel: loading_iAudioModel);
  loadingAssets(): void;
  setPoint_progressBarCurrent(progressCurrent: number): void;
  setAudiosData(audios: { [key: string]: string });
}
export interface loading_iLoadingView {
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
