import { playerInfo, playerInfoPackage } from "../dataModel/playerDataType";
export interface home_iPlayerModel {
  setPlayerInfo(playerInfo: playerInfoPackage);
  getPlayerInfo(): playerInfoPackage;
  registerEvent();
}
export interface home_iPlayerSevice {
  getPlayerID(): number;
}

export interface home_iPlayerView {
  setUserName(userName: string);
  setCoin(coin: number);
  setAvatarByAvatarID(avatarID: number);
}
export interface IHomeSevice {
  getPlayerInfoByPlayerID(playerID: number): playerInfoPackage;
}
