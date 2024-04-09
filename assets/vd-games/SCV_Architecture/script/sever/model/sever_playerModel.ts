import { _decorator } from "cc";
import { playerInfo, playerInfoPackage } from "../../dataModel/playerDataType";
const { ccclass, property } = _decorator;

@ccclass("sever_playerModel")
export class sever_playerModel {
  private static _instance: sever_playerModel = null!;

  public static get instance(): sever_playerModel {
    if (this._instance == null) {
      this._instance = new sever_playerModel();
    }

    return this._instance;
  }
  private _PlayerInfo: playerInfoPackage = null;
  setPlayerInfo(data: playerInfoPackage) {
    this._PlayerInfo = {
      ID: data.ID,
      playerName: data.playerName,
      avatarID: data.avatarID,
      money: data.money,
      playerID: data.playerID,
    };
  }
  getPlayerInfo(): playerInfoPackage {
    return this._PlayerInfo;
  }
}
