import { _decorator, Component, Node } from "cc";
import { sever_iPlayerListModel, sever_iPlayerSevice } from "../../interfaces/sever_interfaces";
import { playerInfo } from "../../dataModel/playerDataType";
import { Global } from "../../common/Global";
import { sever_playerListModel } from "../model/sever_playerListModel";
import { sys } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "../../common/Path";
const { ccclass, property } = _decorator;

@ccclass("sever_playerSevice")
export class sever_playerSevice implements sever_iPlayerSevice {
  private static _instance: sever_playerSevice = null!;

  public static get instance(): sever_playerSevice {
    if (this._instance == null) {
      this._instance = new sever_playerSevice();
    }

    return this._instance;
  }
  numberMin: number = 1001;
  numberMax: number = 1050;
  playerListLenght: number = 50;

  _iPlayerListModel: sever_iPlayerListModel = null;
  init() {
    this.initInterfaces(sever_playerListModel.instance);
  }
  initInterfaces(iPlayerListModel: sever_iPlayerListModel) {
    this._iPlayerListModel = iPlayerListModel;
  }
  init_playerList() {
    let playerListData = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_LIST));
    if (playerListData == null) {
      let playerID_list = this.generateUniquePlayerIDs(this.numberMin, this.numberMax);
      let playersListName = Global.instance.getFirstName();
      let randomPasswordList = Global.instance.generateRandomPasswords(50, 6);
      this.initPlayers(playersListName, playerID_list, randomPasswordList);
    } else {
    }
  }
  generateUniquePlayerIDs(numberMin: number, numberMax: number): number[] {
    const playerIDs: number[] = [];
    while (playerIDs.length < this.playerListLenght) {
      const newPlayerID: number = Math.floor(Math.random() * (numberMax - numberMin + 1)) + numberMin;
      if (!playerIDs.includes(newPlayerID)) {
        playerIDs.push(newPlayerID);
      }
    }
    return playerIDs;
  }
  initPlayerInformation(playerID): playerInfo {
    let playerInfo: playerInfo = null;
    playerInfo = {
      playerID: playerID,
      playerName: "ngocdev",
      avatarID: Global.instance.RandomNumber(1, 25),
      password: "123456",
      money: 10000,
    };
    return playerInfo;
  }
  initPlayers(playerListName: string[], playerIDList: number[], randomPasswordList: string[]) {
    for (let i = 0; i < playerListName.length; i++) {
      let playerInfo: playerInfo = null;
      playerInfo = {
        playerID: playerIDList[i],
        playerName: playerListName[i],
        avatarID: Global.instance.RandomNumber(1, 25),
        password: randomPasswordList[i],
        money: 10000,
      };
      this._iPlayerListModel.setPlayerList(playerInfo);
    }
    let playerMain = this.initPlayerInformation(playerIDList[49]);
    this._iPlayerListModel.setPlayerList(playerMain);
    console.log("playerList", this._iPlayerListModel.getPlayerList());
    this._iPlayerListModel.setPlayerListToLocalStogare();
  }
  getPlayerInfoByUserNameAndPassword(userName: string, password: string): playerInfo {
    let playerInfo = this._iPlayerListModel.getPlayerInfoByUserNameAndPassword(userName, password);
    return playerInfo;
  }
}
