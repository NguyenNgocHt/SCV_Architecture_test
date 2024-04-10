import { _decorator, Component, Prefab, instantiate, sp } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import VDBaseScreen from "../../../../../../vd-framework/ui/VDBaseScreen";
import { MESSENGER_DEFINE, Path } from "../../../common/Path";
import { IAuthenticationService, login_iLoginModel, login_iLoginSevice, login_iLoginView, login_iPlayerModel } from "../../../interfaces/login_interfaces";
import { loginView } from "../view/loginView";
import { director_sendDataToScreensControler } from "../../../director/controler/director_sendDataToScreensControler";
import { loginSevice } from "../sevice/loginSevice";
import { login_loginModel } from "../model/login_loginModel";
import { login_playerModel } from "../model/login_playerModel";
import { loginDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
import { MockAuthenticationService } from "../sevice/MockAuthenticationService";
const { ccclass, property } = _decorator;

@ccclass("loginControler")
export class loginControler extends Component {
  @property(loginView)
  LoginView: loginView = null;

  private _iLoginView: login_iLoginView = null;
  private _iLoginSevice: login_iLoginSevice = null;
  private _iLoginModel: login_iLoginModel = null;
  private _iPlayerModel: login_iPlayerModel = null;
  private _authenTicationSevice: IAuthenticationService = null;

  start() {
    this.initInterfaces(this.LoginView);
    this.RegisterEvents();
  }
  //init
  initInterfaces(iLoginView: login_iLoginView) {
    this._iLoginView = iLoginView;
    this._iLoginSevice = new loginSevice();

    this._iLoginModel = new login_loginModel();
    this._iPlayerModel = new login_playerModel();
    this._authenTicationSevice = new MockAuthenticationService();
  }

  RegisterEvents() {
    this._iLoginSevice.registerEvent();
    this._iLoginModel.registerEvent();
    this._iPlayerModel.registerEvent();
    this.registerEvent_loginControler();
  }

  registerEvent_loginControler() {
    VDEventListener.on(GAME_EVENT_DEFINE.ONCICK_REGISTRATION_BUTTON, this.callToAuthCtr_callRegisterNode.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_LOGIN_NODE, this.callToAuthCtr_callPlayNowNode.bind(this));

    VDEventListener.on(GAME_EVENT_DEFINE.LOGIN_DATA, this.sendLoginDtaToSever.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.LOGIN_SUCCESS, this.switchToTheHomeScreen.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.USER_NAME_WRONG, this.setShowMsg_userNameWrong.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.PASSWORD_WRONG, this.setShowMsg_passwordWrong.bind(this));
    VDEventListener.on(GAME_EVENT_DEFINE.PASSWORD_AND_USER_NAME_WRONG, this.setShowMsg_userNameAndPasswordWrong.bind(this));
  }

  offEvent() {
    VDEventListener.off(GAME_EVENT_DEFINE.ONCICK_REGISTRATION_BUTTON, this.callToAuthCtr_callRegisterNode.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.ONCLICK_PLAY_NOW_BUTTON_FROM_LOGIN_NODE, this.callToAuthCtr_callPlayNowNode.bind(this));

    VDEventListener.off(GAME_EVENT_DEFINE.LOGIN_DATA, this.sendLoginDtaToSever.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.LOGIN_SUCCESS, this.switchToTheHomeScreen.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.USER_NAME_WRONG, this.setShowMsg_userNameWrong.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.PASSWORD_WRONG, this.setShowMsg_passwordWrong.bind(this));
    VDEventListener.off(GAME_EVENT_DEFINE.PASSWORD_AND_USER_NAME_WRONG, this.setShowMsg_userNameAndPasswordWrong.bind(this));
  }

  callToAuthCtr_callRegisterNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_REGISTER_NODE, this.node);
  }

  callToAuthCtr_callPlayNowNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_LOGIN_CTR, this.node);
  }

  sendLoginDtaToSever(data: loginDataType_sendToSever) {
    // VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_DATA_TO_DIRECTOR_FROM_LOGIN, data);
    let loginResult = this._authenTicationSevice.process(data.userName, data.password);
    let playerInfo = this._authenTicationSevice.getPlayerInfoPackage(data.userName, data.password);
    console.log("loginResult", loginResult);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, loginResult);
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_PLAYER_INFO_TO_PLAYER_MODEL, playerInfo);
  }

  switchToTheHomeScreen() {
    this.resetShowMessenger();
    let pfFxCloud = VDScreenManager.instance.assetBundle.get(Path.TRANSITION_CLOUD, Prefab)!;
    let nodeCloud = instantiate(pfFxCloud);
    VDScreenManager.instance.showEffect(nodeCloud);

    let spineCloud = nodeCloud.getComponent(sp.Skeleton);
    let entry = spineCloud.setAnimation(0, "transition_to_lucky", false);

    spineCloud.setTrackCompleteListener(entry, (x: any, ev: any) => {
      VDScreenManager.instance.removeAllEffects();
    });
    spineCloud.setTrackEventListener(entry, (x: any, ev: any) => {
      if (ev && ev.data && ev.data.name && ev.data.name == "transition") {
        let play_screen = VDScreenManager.instance.assetBundle.get(Path.HOME_SCREEN, Prefab)!;
        VDScreenManager.instance.pushScreen(
          play_screen,
          (screen: VDBaseScreen) => {
            director_sendDataToScreensControler.instance.isHomeScreen = true;
            director_sendDataToScreensControler.instance.isLoginScreen = false;
          },
          true
        );
      }
    });
  }

  resetShowMessenger() {
    this._iLoginView.showMessenger_userNameWrong("");
    this._iLoginView.showMessenger_passwordWrong("");
  }

  setShowMsg_userNameWrong() {
    this._iLoginView.showMessenger_userNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);
    this._iLoginView.showMessenger_passwordWrong("");
  }

  setShowMsg_passwordWrong() {
    this._iLoginView.showMessenger_passwordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);
    this._iLoginView.showMessenger_userNameWrong("");
  }

  setShowMsg_userNameAndPasswordWrong() {
    console.log("come in setShowMsg_userNameAndPasswordWrong");
    this._iLoginView.showMessenger_userNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);
    this._iLoginView.showMessenger_passwordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);
  }
}
