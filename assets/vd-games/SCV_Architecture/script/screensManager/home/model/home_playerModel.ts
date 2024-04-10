import { _decorator, Component, Node } from "cc";
import { playerInfo, playerInfoPackage } from "../../../dataModel/playerDataType";
import { home_iPlayerModel } from "../../../interfaces/home_interfaces";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { Player_ID } from "../../../dataModel/homeDataType_sendToSever";
const { ccclass, property } = _decorator;

@ccclass("home_playerModel")
export class home_playerModel implements home_iPlayerModel {
  private static _instance: home_playerModel | null = null;

  public static get instance(): home_playerModel {
    if (this._instance == null) {
      this._instance = new home_playerModel();
    }
    return this._instance;
  }
  private _playerInfo: playerInfoPackage = null;

  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, this.handlePlayerInfo.bind(this));
  }

  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, this.handlePlayerInfo.bind(this));
  }

  handlePlayerInfo(playerInfo: playerInfoPackage) {
    console.log(playerInfo);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, playerInfo);
  }

  setPlayerInfo(playerInfo: playerInfoPackage) {
    this._playerInfo = playerInfo;
  }

  getPlayerInfo(): playerInfoPackage {
    return this._playerInfo;
  }
}
