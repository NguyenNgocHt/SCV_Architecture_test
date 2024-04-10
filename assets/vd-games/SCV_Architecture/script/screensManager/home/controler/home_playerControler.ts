import { _decorator, Component, Node } from "cc";
import { home_iPlayerModel, home_iPlayerSevice, home_iPlayerView, IHomeSevice } from "../../../interfaces/home_interfaces";
import { home_playerSevice } from "../sevice/home_playerSvice";
import { home_playerView } from "../view/home_playerView";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { Player_ID } from "../../../dataModel/homeDataType_sendToSever";
import { CLIENT_COMMAN_ID_OP } from "../../../common/define";
import { playerInfoPackage } from "../../../dataModel/playerDataType";
import { home_playerModel } from "../model/home_playerModel";
import { mockHomeSevice } from "../sevice/mockHomeSevice";
const { ccclass, property } = _decorator;

@ccclass("home_playerControler")
export class home_playerControler extends Component {
  @property(home_playerView)
  PlayerView: home_playerView = null;
  private _iPlayerSevice: home_iPlayerSevice = null;
  private _iPlayerView: home_iPlayerView = null;
  private _iPlayerModel: home_iPlayerModel = null;
  private _mockHomeSevice: IHomeSevice = null;
  onLoad() {
    this.initInterfaces(this.PlayerView);
    this.registerEvent();
  }
  registerEvent() {
    this._iPlayerModel.registerEvent();
    this.registerEvent_playerControler();
  }
  registerEvent_playerControler() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, this.setPlayerView.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, this.setPlayerView.bind(this));
  }
  start() {
    this.getPlayerIDFromPlayerSevice();
  }
  initInterfaces(iPlayerView: home_iPlayerView) {
    this._iPlayerSevice = new home_playerSevice();
    this._iPlayerModel = new home_playerModel();
    this._iPlayerView = iPlayerView;
    this._mockHomeSevice = new mockHomeSevice();
  }
  getPlayerIDFromPlayerSevice() {
    let playerID = this._iPlayerSevice.getPlayerID();
    console.log("playerID", playerID);
    let playerIDPackage: Player_ID = null;
    playerIDPackage = {
      id: CLIENT_COMMAN_ID_OP.SEND_PLAYERID_ID,
      playerID: playerID,
    };
    let playerInfo = this._mockHomeSevice.getPlayerInfoByPlayerID(playerID);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, playerInfo);
  }
  setPlayerView(playerInfo: playerInfoPackage) {
    this._iPlayerView.setAvatarByAvatarID(playerInfo.avatarID);
    this._iPlayerView.setCoin(playerInfo.money);
    this._iPlayerView.setUserName(playerInfo.playerName);
  }
}
