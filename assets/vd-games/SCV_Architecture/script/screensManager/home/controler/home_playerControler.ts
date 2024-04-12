import { _decorator, Component, Node } from "cc";
import { IPlayerModel_Home, IPlayerSevice_home, IPlayerView_home, IHomeSevice } from "../../../interfaces/home_interfaces";
import { home_playerSevice } from "../sevice/home_playerSvice";
import { home_playerView } from "../view/home_playerView";
import { EventListener } from "../../../../../../vd-framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
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

  private _playerSevice: IPlayerSevice_home = null;
  private _playerView: IPlayerView_home = null;
  private _playerModel: IPlayerModel_Home = null;
  private _mockHomeSevice: IHomeSevice = null;

  onLoad() {
    this.initInterfaces(this.PlayerView);

    this.registerEvent();
  }

  registerEvent() {
    this._playerModel.registerEvent();

    this.registerEvent_playerControler();
  }

  registerEvent_playerControler() {
    EventListener.on(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, this.setPlayerView.bind(this));
  }

  offEvent() {
    EventListener.off(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, this.setPlayerView.bind(this));
  }

  start() {
    this.getPlayerIDFromPlayerSevice();
  }

  initInterfaces(iPlayerView: IPlayerView_home) {
    this._playerSevice = new home_playerSevice();
    this._mockHomeSevice = new mockHomeSevice();

    this._playerModel = new home_playerModel();

    this._playerView = iPlayerView;
  }
  getPlayerIDFromPlayerSevice() {
    let playerID = this._playerSevice.getPlayerID();

    let playerIDPackage: Player_ID = null;
    playerIDPackage = {
      id: CLIENT_COMMAN_ID_OP.SEND_PLAYERID_ID,
      playerID: playerID,
    };

    let playerInfo = this._mockHomeSevice.getPlayerInfoByPlayerID(playerID);

    EventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, playerInfo);
  }

  setPlayerView(playerInfo: playerInfoPackage) {
    this._playerView.setAvatarByAvatarID(playerInfo.avatarID);

    this._playerView.setCoin(playerInfo.money);

    this._playerView.setUserName(playerInfo.playerName);
  }
}
