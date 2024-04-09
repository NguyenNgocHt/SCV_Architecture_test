import { _decorator } from "cc";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
import { SEVER_COMAN_ID_IP } from "../../common/define";
import { loginDataType_sendToSever } from "../../dataModel/loginDataType_sendToSever";
import { loginResult } from "../../dataModel/loginDataType_sendToClient";
import { sever_iLoginModel } from "../../interfaces/sever_interfaces";
const { ccclass, property } = _decorator;

@ccclass("sever_loginModel")
export class sever_loginModel implements sever_iLoginModel {
  private static _instance: sever_loginModel = null!;

  public static get instance(): sever_loginModel {
    if (this._instance == null) {
      this._instance = new sever_loginModel();
    }

    return this._instance;
  }
  private loginData: loginResult = null;
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_NODE_DATA_TO_SEVER, this.handleLoginData.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_NODE_DATA_TO_SEVER, this.handleLoginData.bind(this));
  }
  handleLoginData(msg) {
    console.log("msg in sever", msg);
    let dataJson = JSON.parse(msg);
    let dataID = dataJson.id;
    console.log("data json", dataJson, dataID);
    switch (dataID) {
      case SEVER_COMAN_ID_IP.LOGIN_ID:
        console.log("data json", dataJson);
        VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_LOGIN_SEVICE, dataJson);
        break;
    }
  }
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
