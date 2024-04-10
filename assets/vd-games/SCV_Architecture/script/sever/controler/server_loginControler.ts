import { _decorator } from "cc";
import { sever_iLoginModel, sever_iLoginSevice } from "../../interfaces/sever_interfaces";
import { sever_loginSevice } from "../sevice/sever_loginSevice";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
import { sever_loginModel } from "../model/sever_loginModel";
const { ccclass, property } = _decorator;

@ccclass("server_loginControler")
export class server_loginControler {
  private static _instance: server_loginControler = null!;

  public static get instance(): server_loginControler {
    if (this._instance == null) {
      this._instance = new server_loginControler();
    }

    return this._instance;
  }
  private _iLoginSevice: sever_iLoginSevice = null;
  private _iLoginModel: sever_iLoginModel = null;

  init() {
    this.initInterfaces();
    this.registerEvent();
  }
  registerEvent() {
    this._iLoginModel.registerEvent();
    this.registerEvent_loginControler();
  }
  registerEvent_loginControler() {
    //commit from loginSevice
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_CONTROLER, this.getLoginResulData.bind(this));
    //commit from loginModel
    VDEventListener.on(GAME_EVENT_DEFINE.LOGIN_PACKAGE_HAS_ARRIVED_AT_THE_SERVER, this.getPlayerListFromPlayerControler.bind(this));
    //commit from playerControler
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_PLAYER_LIST_TO_LOGIN_CONTROLER, this.getPlayerListAndSendToLoginSevice.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_CONTROLER, this.getLoginResulData.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.LOGIN_PACKAGE_HAS_ARRIVED_AT_THE_SERVER, this.getPlayerListFromPlayerControler.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_PLAYER_LIST_TO_LOGIN_CONTROLER, this.getPlayerListAndSendToLoginSevice.bind(this));
  }
  initInterfaces() {
    this._iLoginSevice = new sever_loginSevice();
    this._iLoginModel = new sever_loginModel();
  }
  getLoginResulData(isStatusLogin: boolean) {
    if (isStatusLogin) {
      let loginResultData = this._iLoginSevice.getLoginResultData();
      let loginDataSendToSever = this._iLoginSevice.getLoginDataSendToSever();
      VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_CLIENT, JSON.stringify(loginResultData));
      VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_PLAYER_CONTROLER, loginDataSendToSever);
    } else {
      let loginResultData = this._iLoginSevice.getLoginResultData();
      VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_CLIENT, JSON.stringify(loginResultData));
    }
  }
  getPlayerListFromPlayerControler() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.GET_PLAYER_LIST_AND_SEND_TO_LOGIN_CONTROLER);
  }
  getPlayerListAndSendToLoginSevice(data) {
    let playerList = data;
    let loginData = this._iLoginSevice.getLoginDataSendToSever();
    this._iLoginSevice.checkLoginData(playerList, loginData);
  }
}
