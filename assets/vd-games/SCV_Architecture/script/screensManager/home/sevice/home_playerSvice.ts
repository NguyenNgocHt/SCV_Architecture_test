import { playerInfo } from "./../../../dataModel/playerDataType";
import { _decorator, Component, Node } from "cc";
import { home_iPlayerSevice } from "../../../interfaces/home_interfaces";
import { sys } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "../../../common/Path";
const { ccclass, property } = _decorator;

@ccclass("home_playerSevice")
export class home_playerSevice implements home_iPlayerSevice {
  getPlayerID(): number {
    let playerInfo: playerInfo = null;
    playerInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO));
    return playerInfo.playerID;
  }
}
