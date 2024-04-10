import { playerInfo } from "./../../../dataModel/playerDataType";
import { _decorator, Component, Node } from "cc";
import { home_iPlayerSevice } from "../../../interfaces/home_interfaces";
import { sys } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "../../../common/Path";
import { playerModel } from "../../login/model/playerModel";
const { ccclass, property } = _decorator;

@ccclass("home_playerSevice")
export class home_playerSevice implements home_iPlayerSevice {
  private static _instance: home_playerSevice | null = null;

  public static get instance(): home_playerSevice {
    if (this._instance == null) {
      this._instance = new home_playerSevice();
    }
    return this._instance;
  }
  getPlayerID(): number {
    let playerInfo: playerInfo = null;
    playerInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO));
    return playerInfo.playerID;
  }
}
