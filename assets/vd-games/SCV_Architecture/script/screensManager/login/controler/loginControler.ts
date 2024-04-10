import { _decorator, Component, Node, Prefab, instantiate, sp } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import VDBaseScreen from "../../../../../../vd-framework/ui/VDBaseScreen";
import { MESSENGER_DEFINE, Path } from "../../../common/Path";
import { login_iLoginView } from "../../../interfaces/login_interfaces";
import { loginView } from "../view/loginView";
import { director_sendDataToScreensControler } from "../../../director/controler/director_sendDataToScreensControler";
const { ccclass, property } = _decorator;

@ccclass("loginControler")
export class loginControler extends Component {
  @property(loginView)
  LoginView: loginView = null;
  private _iLoginView: login_iLoginView = null;
  start() {
    this.RegisterEvent();
    this.initInterfaces(this.LoginView);
  }
  RegisterEvent() {
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
  initInterfaces(iLoginView: login_iLoginView) {
    this._iLoginView = iLoginView;
  }

  callToAuthCtr_callRegisterNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_REGISTER_NODE, this.node);
  }

  callToAuthCtr_callPlayNowNode() {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.CALL_PLAY_NOW_NODE_FROM_LOGIN_CTR, this.node);
  }

  sendLoginDtaToSever(data) {
    VDEventListener.dispatchEvent(GAME_EVENT_DEFINE.SEND_DATA_TO_DIRECTOR_FROM_LOGIN, data);
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
