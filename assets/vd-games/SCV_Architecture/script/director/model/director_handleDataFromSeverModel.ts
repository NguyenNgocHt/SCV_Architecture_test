import { _decorator, Component, Node } from "cc";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT } from "../../network/networkDefine";
import { loginResult } from "../../dataModel/loginDataType_sendToClient";
import { playerInfoPackage } from "../../dataModel/playerDataType";
const { ccclass, property } = _decorator;

@ccclass("director_handleDataFromSeverModel")
export class director_handleDataFromSeverModel {
  private static _instance: director_handleDataFromSeverModel = null!;

  public static get instance(): director_handleDataFromSeverModel {
    if (this._instance == null) {
      this._instance = new director_handleDataFromSeverModel();
    }

    return this._instance;
  }
  _loginResult: loginResult = null;
  _playerInfo: playerInfoPackage = null;
  registerEvent() {
    VDEventListener.on(GAME_EVENT.SEND_LOGIN_RESULT_DATA_TO_DIRECTOR, this.handleLoginResultData.bind(this));
    VDEventListener.on(GAME_EVENT.SEND_PLAYER_INFO_TO_DIRECTOR, this.handlePlayerInfo.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT.SEND_LOGIN_RESULT_DATA_TO_DIRECTOR, this.handleLoginResultData.bind(this));
    VDEventListener.off(GAME_EVENT.SEND_PLAYER_INFO_TO_DIRECTOR, this.handlePlayerInfo.bind(this));
  }
  handleLoginResultData(loginResult: loginResult) {
    console.log("come in director_handleDataFromSeverModel");
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_RESULT_DATA_TO_SCREENS_CONTROLER, loginResult);
    this.setLoginResultData(loginResult);
  }

  handlePlayerInfo(playerInfo: playerInfoPackage) {
    console.log("come in director_handleDataFromSeverModel");
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_INFO_TO_SCREENS_CONTROLER, playerInfo);
    this.setPlayerInfo(playerInfo);
  }

  setLoginResultData(loginResult: loginResult) {
    this._loginResult = loginResult;
  }

  setPlayerInfo(playerInfo: playerInfoPackage) {
    this._playerInfo = playerInfo;
  }
}
