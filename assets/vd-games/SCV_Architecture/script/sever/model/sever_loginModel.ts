import { _decorator } from "cc";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
import { SEVER_COMMAN_ID_IP } from "../../common/define";
import { loginDataType_sendToSever } from "../../dataModel/loginDataType_sendToSever";
import { loginResult } from "../../dataModel/loginDataType_sendToClient";

const { ccclass, property } = _decorator;

@ccclass("sever_loginModel")
export class sever_loginModel implements sever_loginModel {
  private static _instance: sever_loginModel = null!;

  public static get instance(): sever_loginModel {
    if (this._instance == null) {
      this._instance = new sever_loginModel();
    }

    return this._instance;
  }
  private loginDataSendToSever: loginDataType_sendToSever = null;
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
      case SEVER_COMMAN_ID_IP.LOGIN_ID:
        console.log("data json", dataJson);
        this.setLoginData_sendToSever(dataJson);
        VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_LOGIN_SEVICE, dataJson);
        break;
    }
  }
  setLoginData_sendToSever(data: loginDataType_sendToSever) {
    this.loginDataSendToSever = {
      id: data.id,
      userName: data.userName,
      password: data.password,
    };
  }
  getLoginData_sendToSever(): loginDataType_sendToSever {
    return this.loginDataSendToSever;
  }
}
