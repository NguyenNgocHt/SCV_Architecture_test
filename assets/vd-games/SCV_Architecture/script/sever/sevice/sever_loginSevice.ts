import { SEVER_COMMAN_ID_OP } from "./../../common/define";
import { _decorator } from "cc";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT } from "../../network/networkDefine";
import { loginDataType_sendToSever } from "../../dataModel/loginDataType_sendToSever";
import { loginResult } from "../../dataModel/loginDataType_sendToClient";
import { sever_iLoginModel, sever_iLoginResulModel, sever_iLoginSevice } from "../../interfaces/sever_interfaces";
import { sever_loginModel } from "../model/sever_loginModel";
import { sever_loginResultModel } from "../model/sever_loginResultModel";
import { playerInfo } from "../../dataModel/playerDataType";
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
  _iLoginResult: sever_iLoginResulModel = null;
  _iLoginSendToSever: sever_iLoginModel = null;

  _isStatusUserNamer: boolean = false;
  _isStatusPassword: boolean = false;
  _isSatusLogin: boolean = false;

  _loginResult: loginResult = null;
  init() {
    this.initInterfaces(sever_loginResultModel.instance, sever_loginModel.instance);
  }

  initInterfaces(iLoginResultModel: sever_iLoginResulModel, iLoginSendToSever: sever_iLoginModel) {
    this._iLoginResult = iLoginResultModel;
    this._iLoginSendToSever = iLoginSendToSever;
  }

  checkLoginData(playerList: playerInfo[], loginData: loginDataType_sendToSever) {
    let dataCheck = loginData;
    this._isStatusUserNamer = false;
    this._isStatusPassword = false;
    for (let i = 0; i < playerList.length; i++) {
      if (dataCheck.userName === playerList[i].playerName) {
        this._isStatusUserNamer = true;
      }
      if (dataCheck.password === playerList[i].password) {
        this._isStatusPassword = true;
      }
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
      ID: SEVER_COMMAN_ID_OP.LOGIN_RESULT_ID,
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
    VDEventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_CONTROLER, this._isSatusLogin);
  }

  getLoginDataSendToSever(): loginDataType_sendToSever {
    return this._iLoginSendToSever.getLoginData_sendToSever();
  }
}
