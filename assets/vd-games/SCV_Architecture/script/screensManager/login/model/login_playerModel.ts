import { _decorator } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import { playerInfoPackage } from "../../../dataModel/playerDataType";
import { sys } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "../../../common/Path";
import { login_iPlayerModel } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("login_playerModel")
export class login_playerModel implements login_iPlayerModel {
  _playerInfo: playerInfoPackage = null;
  registerEvent() {
    VDEventListener.on(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL, this.handlePlayerInfo.bind(this));
  }
  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL, this.handlePlayerInfo.bind(this));
  }
  handlePlayerInfo(playerInfo: playerInfoPackage) {
    this.setPlayerInfo(playerInfo);
  }
  setPlayerInfo(playerInfo: playerInfoPackage) {
    this._playerInfo = playerInfo;
    console.log("playerInfo", this._playerInfo);
    sys.localStorage.setItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO, JSON.stringify(this._playerInfo));
  }
  getPlayerinfo(): playerInfoPackage {
    return this._playerInfo;
  }
}
