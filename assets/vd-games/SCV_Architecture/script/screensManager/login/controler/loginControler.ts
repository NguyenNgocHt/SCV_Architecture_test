import { authControler } from "./authControler";
import { _decorator, Component, Prefab, instantiate, sp } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT_DEFINE } from "../../../network/networkDefine";
import VDScreenManager from "../../../../../../vd-framework/ui/VDScreenManager";
import VDBaseScreen from "../../../../../../vd-framework/ui/VDBaseScreen";
import { MESSENGER_DEFINE, Path } from "../../../common/Path";
import { IAuthController, IAuthenticationService, ILoginController, login_iLoginModel, login_iLoginSevice, login_iLoginView, login_iPlayerModel } from "../../../interfaces/login_interfaces";
import { loginView } from "../view/loginView";
import { director_sendDataToScreensControler } from "../../../director/controler/director_sendDataToScreensControler";
import { loginSevice } from "../sevice/loginSevice";
import { login_loginModel } from "../model/login_loginModel";
import { login_playerModel } from "../model/login_playerModel";
import { loginDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
import { MockAuthenticationService } from "../sevice/MockAuthenticationService";
const { ccclass, property } = _decorator;

@ccclass("loginControler")
export class loginControler extends Component implements ILoginController {
  @property(loginView)
  LoginView: loginView = null;

  private _iLoginView: login_iLoginView = null;
  private _iLoginSevice: login_iLoginSevice = null;
  private _iLoginModel: login_iLoginModel = null;
  private _iPlayerModel: login_iPlayerModel = null;
  private _authenTicationSevice: IAuthenticationService = null;
  private _authController: IAuthController = null;

  init(authController: IAuthController) {
    console.log("come in loginControler");
    this.initInterfaces(this.LoginView, authController);
    this.RegisterEvents();
  }
  //init
  initInterfaces(iLoginView: login_iLoginView, authControler: IAuthController) {
    this._iLoginView = iLoginView;
    this._iLoginSevice = new loginSevice();

    this._iLoginModel = new login_loginModel();
    this._iPlayerModel = new login_playerModel();
    this._authenTicationSevice = new MockAuthenticationService();

    this._authController = authControler;
  }

  RegisterEvents() {
    this._iLoginSevice.registerEvent();
    this._iLoginModel.registerEvent();
    this._iPlayerModel.registerEvent();
    this._iLoginSevice.Init(this);
    this._iLoginView.init(this);
  }

  callToAuthCtr_callRegisterNode() {
    this._authController.registerNodeControl(this.node);
  }

  callToAuthCtr_callPlayNowNode() {
    this._authController.playNowNodeControl(this.node);
  }

  sendLoginDtaToSever(data: loginDataType_sendToSever) {
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
