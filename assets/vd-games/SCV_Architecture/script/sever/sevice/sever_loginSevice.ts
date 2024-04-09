import { SEVER_COMAN_ID_OP } from "./../../common/define";
import { loading_iLoadingView } from "./../../interfaces/loading_interfaces";
import { _decorator, Component, Node } from "cc";
import { sendDataToSever } from "../../network/sendDataToSever";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
import { loginDataType_sendToSever } from "../../dataModel/loginDataType_sendToSever";
import { loginResult } from "../../dataModel/loginDataType_sendToClient";
import { sever_iLoginModel, sever_iLoginSevice } from "../../interfaces/sever_interfaces";
import { sever_loginModel } from "../model/sever_loginModel";
const { ccclass, property } = _decorator;

@ccclass("sever_loginSevice")
export class sever_loginSevice implements sever_iLoginSevice {
  private static _instance: sever_loginSevice = null!;

  public static get instance(): sever_loginSevice {
    if (this._instance == null) {
      this._instance = new sever_loginSevice();
    }

    return this._instance;
  }
  _iLoginResult: sever_iLoginModel = null;

  _isStatusUserNamer: boolean = false;
  _isStatusPassword: boolean = false;
  _isSatusLogin: boolean = false;

  _loginResult: loginResult = null;
  init() {
    this.registerEvent();
    this.initInterfaces(sever_loginModel.instance);
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_LOGIN_SEVICE, this.checkLoginData.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_LOGIN_SEVICE, this.checkLoginData.bind(this));
  }
  initInterfaces(iLoginModel: sever_iLoginModel) {
    this._iLoginResult = iLoginModel;
  }
  checkLoginData(data: loginDataType_sendToSever) {
    let dataCheck = data;
    console.log("data check", dataCheck);
    if (data.userName === "ngocdev") {
      console.log("user name true");
      this._isStatusUserNamer = true;
    } else {
      console.log("user name false");
      this._isStatusUserNamer = false;
    }
    if (data.password === "123456") {
      console.log("password true");
      this._isStatusPassword = true;
    } else {
      console.log("password false");
      this._isStatusPassword = false;
    }
    this.checkStatusLogin(this._isStatusUserNamer, this._isStatusPassword);
  }
  checkStatusLogin(isStatusUserName: boolean, isStatusPassword) {
    if (isStatusUserName && isStatusPassword) {
      this._isSatusLogin = true;
      console.log("login success");
      this.setLoginResultData();
    } else if (isStatusUserName && !isStatusPassword) {
      this._isSatusLogin = false;
      console.log("login false");
      console.log("password wrong");
      this.setLoginResultData();
    } else if (!isStatusUserName && isStatusPassword) {
      this._isSatusLogin = false;
      console.log("login false");
      console.log("user name wrong");
      this.setLoginResultData();
    } else if (!isStatusUserName && !isStatusPassword) {
      this._isSatusLogin = false;
      console.log("login false");
      console.log("user name , password wrong");
      this.setLoginResultData();
    }
    this.sendLoginDataToLoginControler();
  }
  setLoginResultData() {
    let loginResult: loginResult = null;
    loginResult = {
      ID: SEVER_COMAN_ID_OP.LOGIN_RESULT_ID,
      isLogin: this._isSatusLogin,
      isUserName: this._isStatusUserNamer,
      isPassword: this._isStatusPassword,
    };
    this._iLoginResult.setLoginData(loginResult);
    console.log(this._iLoginResult.getLoginData());
  }
  getLoginResultData(): loginResult {
    return this._iLoginResult.getLoginData();
  }
  sendLoginDataToLoginControler() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_CONTROLER_LOGIN, this._isSatusLogin);
  }
}
