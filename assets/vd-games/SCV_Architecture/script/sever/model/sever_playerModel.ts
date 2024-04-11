import { GAME_EVENT } from "./../../network/networkDefine";
import { _decorator } from "cc";
import { playerInfo, playerInfoPackage } from "../../dataModel/playerDataType";
import {} from "../../../../../vd-framework/common/VDEventListener";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { Player_ID } from "../../dataModel/homeDataType_sendToSever";
import { SEVER_COMMAN_ID_IP } from "../../common/define";
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
  registerEvent() {
    //player in home
    VDEventListener.on(GAME_EVENT.SEND_PLAYER_IN_HOME_DATA_TO_SEVER, this.handlePlayerInHomeData.bind(this));
  }
  offEvent() {
    VDEventListener.on(GAME_EVENT.SEND_PLAYER_IN_HOME_DATA_TO_SEVER, this.handlePlayerInHomeData.bind(this));
  }

  handlePlayerInHomeData(data) {
    let dataJson = JSON.parse(data);
    console.log(dataJson);
    let dataID = dataJson.id;
    switch (dataID) {
      case SEVER_COMMAN_ID_IP.SEND_PLAYERID_ID:
        VDEventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_ID_TO_SERVER_PLAYER_CONTROLER, dataJson);
    }
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
