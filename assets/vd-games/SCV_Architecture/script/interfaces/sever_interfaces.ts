import { loginDataType_sendToSever } from "./../dataModel/loginDataType_sendToSever";
import { loginResult } from "../dataModel/loginDataType_sendToClient";
import { playerInfo } from "../dataModel/playerDataType";

export interface sever_iLoginResulModel {
  setLoginData(data: loginResult): void;
  getLoginData(): loginResult;
}
export interface sever_iLayerInfoModel { }

//ILoginSevice
export interface sever_iLoginSevice {
  getLoginResultData(): loginResult;
  getLoginDataSendToSever(): loginDataType_sendToSever;
  checkLoginData(playerList: playerInfo[], loginData: loginDataType_sendToSever): void;
}
export interface sever_iPlayerSevice {
  init_playerList(): void;
  init(): void;
  getPlayerInfoByUserNameAndPassword(userName: string, password: string): playerInfo;
  getPlayerList(): playerInfo[];
  getPlayerInfoByPlayerIDFromPlayerList(playerID): playerInfo;
}
export interface sever_iPlayerListModel {
  setPlayerList(player: playerInfo): void;
  getPlayerByIDFromPlayerList(playerID: number): playerInfo;
  getPlayerList(): playerInfo[];
  setPlayerListToLocalStogare(): void;
  getPlayerInfoByUserNameAndPassword(userName: string, password: string): playerInfo;
}
export interface sever_iLoginModel {
  setLoginData_sendToSever(data: loginDataType_sendToSever): void;
  getLoginData_sendToSever(): loginDataType_sendToSever;
  registerEvent();
}
