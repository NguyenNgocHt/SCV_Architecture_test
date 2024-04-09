import { _decorator, Component, Node } from "cc";
import { sever_iPlayerSevice } from "../../interfaces/sever_interfaces";
import { sever_playerSevice } from "../sevice/sever_playerSevice";
import { VDEventListener } from "../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../network/networkDefine";
import { loginDataType_sendToSever } from "../../dataModel/loginDataType_sendToSever";
import { playerInfoPackage } from "../../dataModel/playerDataType";
import { SEVER_COMMAN_ID_OP } from "../../common/define";
const { ccclass, property } = _decorator;

@ccclass("sever_playerControler")
export class sever_playerControler extends Component {
  private static _instance: sever_playerControler = null!;

  public static get instance(): sever_playerControler {
    if (this._instance == null) {
      this._instance = new sever_playerControler();
    }

    return this._instance;
  }
  private _iPlayerSevice: sever_iPlayerSevice = null;
  init() {
    this.registerEvent();
    this.initInterfaces(sever_playerSevice.instance);
    this.initPlayerList();
  }
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_PLAYER_CONTROLER, this.getPlayerInfoByUserNameAndPass.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_LOGIN_DATA_TO_PLAYER_CONTROLER, this.getPlayerInfoByUserNameAndPass.bind(this));
  }
  initInterfaces(iPlayerSevice: sever_iPlayerSevice) {
    this._iPlayerSevice = iPlayerSevice;
  }
  initPlayerList() {
    this._iPlayerSevice.init();
    this._iPlayerSevice.init_playerList();
  }
  getPlayerInfoByUserNameAndPass(loginData: loginDataType_sendToSever) {
    let playerInfo = this._iPlayerSevice.getPlayerInfoByUserNameAndPassword(loginData.userName, loginData.password);
    console.log("player info", playerInfo);
    let playerInfoPackage: playerInfoPackage = null;
    playerInfoPackage = {
      ID: SEVER_COMMAN_ID_OP.PLAYER_INFO_ID,
      playerName: playerInfo.playerName,
      avatarID: playerInfo.avatarID,
      playerID: playerInfo.playerID,
      money: playerInfo.money,
    };
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_CLIENT, playerInfoPackage);
  }
}
