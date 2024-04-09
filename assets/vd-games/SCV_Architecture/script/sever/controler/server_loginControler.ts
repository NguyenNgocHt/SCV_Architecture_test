import { _decorator } from "cc";
import { sever_iLoginSevice } from "../../interfaces/sever_interfaces";
import { sever_loginSevice } from "../sevice/sever_loginSevice";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
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

  init() {
    this.registerEvent();
    this.initInterfaces(sever_loginSevice.instance);
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_CONTROLER_LOGIN, this.getLoginResulData.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_CONTROLER_LOGIN, this.getLoginResulData.bind(this));
  }
  initInterfaces(iLoginSevice: sever_iLoginSevice) {
    this._iLoginSevice = iLoginSevice;
  }
  getLoginResulData(isStatusLogin: boolean) {
    if (isStatusLogin) {
      console.log("gửi kết quả về client đồng thời gọi playerControler để gửi playerInfoModel về client");
    } else {
      console.log("gửi kết quả login về client");
    }
  }
}
