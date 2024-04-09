import { loginResult } from "../dataModel/loginDataType_sendToClient";
export interface sever_iLoginModel {
  setLoginData(data: loginResult): void;
  getLoginData(): loginResult;
}
export interface sever_iLayerInfoModel {}
export interface sever_iLoginSevice {
  getLoginResultData(): loginResult;
}
export interface sever_iPlayerSevice {}
