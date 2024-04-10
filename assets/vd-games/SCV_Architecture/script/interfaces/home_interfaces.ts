import { playerInfo, playerInfoPackage } from "../dataModel/playerDataType";
export interface home_iPlayerModel {
  setPlayerInfo(playerInfo: playerInfoPackage);
  getPlayerInfo(): playerInfoPackage;
}
export interface home_iPlayerSevice {
  getPlayerID(): number;
}

export interface home_iPlayerView {
  setUserName(userName: string);
  setCoin(coin: number);
  setAvatarByAvatarID(avatarID: number);
}
