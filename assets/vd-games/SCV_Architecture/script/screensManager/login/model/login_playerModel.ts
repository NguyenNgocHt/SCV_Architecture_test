import { _decorator } from "cc";
import { EventListener } from "../../../../../../vd-framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import { playerInfoPackage } from "../../../dataModel/playerDataType";
import { sys } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "../../../common/Path";
import { IPlayerModel_login } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("login_playerModel")
export class login_playerModel implements IPlayerModel_login {
  _playerInfo: playerInfoPackage = null;

  registerEvent() {
    EventListener.on(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL, this.handlePlayerInfo.bind(this));
  }

  offEvent() {
    EventListener.off(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL, this.handlePlayerInfo.bind(this));
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
