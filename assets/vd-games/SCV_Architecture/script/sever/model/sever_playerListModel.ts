import { _decorator, Component, Node } from "cc";
import { playerInfo } from "../../dataModel/playerDataType";
import { sever_iPlayerListModel } from "../../interfaces/sever_interfaces";
import { sys } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "../../common/Path";
const { ccclass, property } = _decorator;

@ccclass("sever_playerListModel")
export class sever_playerListModel implements sever_iPlayerListModel {
  private static _instance: sever_playerListModel = null!;

  public static get instance(): sever_playerListModel {
    if (this._instance == null) {
      this._instance = new sever_playerListModel();
    }

    return this._instance;
  }
  listLenght: number = 50;
  playerList: playerInfo[] = [];

  setPlayerList(player: playerInfo) {
    this.playerList.push(player);
  }
  getPlayerByIDFromPlayerList(playerID: number): playerInfo {
    let playerList = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_LIST));
    if (playerList) {
      for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].playerID == playerID) {
          return playerList[i];
        }
      }
    }
  }
  getPlayerInfoByUserNameAndPassword(userName: string, password: string): playerInfo {
    let playerList = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_LIST));
    if (playerList) {
      for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].playerName === userName && playerList[i].password === password) {
          return playerList[i];
        }
      }
    }
  }
  getPlayerList(): playerInfo[] {
    let playerList = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_LIST));
    if (playerList != null) {
      return playerList;
    }
  }
  setPlayerListToLocalStogare() {
    sys.localStorage.setItem(LOCAL_STORAGE_KEY_WORD.PLAYER_LIST, JSON.stringify(this.playerList));
  }
}
