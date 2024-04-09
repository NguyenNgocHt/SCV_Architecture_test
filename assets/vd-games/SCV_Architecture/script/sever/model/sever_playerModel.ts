import { _decorator, Component, Node } from "cc";
import { playerInfo } from "../../dataModel/playerDataType_sendToClient";
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
  private _PlayerInfo: playerInfo = null;
  setPlayerInfo(data: playerInfo) {
    this._PlayerInfo = {
      ID: data.ID,
      playerName: data.playerName,
      avatarID: data.avatarID,
      money: data.money,
    };
  }
  getPlayerInfo(): playerInfo {
    return this._PlayerInfo;
  }
}
