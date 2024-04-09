import { _decorator, Component, Node } from "cc";
import { loginResult } from "../../dataModel/loginDataType_sendToClient";
import { sever_iLoginResulModel } from "../../interfaces/sever_interfaces";
const { ccclass, property } = _decorator;

@ccclass("sever_loginResultModel")
export class sever_loginResultModel implements sever_iLoginResulModel {
  private static _instance: sever_loginResultModel = null!;

  public static get instance(): sever_loginResultModel {
    if (this._instance == null) {
      this._instance = new sever_loginResultModel();
    }

    return this._instance;
  }
  private loginData: loginResult = null;
  setLoginData(data: loginResult) {
    this.loginData = {
      ID: data.ID,
      isLogin: data.isLogin,
      isUserName: data.isUserName,
      isPassword: data.isPassword,
    };
  }
  getLoginData(): loginResult {
    return this.loginData;
  }
}
