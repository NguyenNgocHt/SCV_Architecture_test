import { _decorator, Component, Prefab, instantiate, sp } from "cc";
import { VDEventListener } from "../../../../../../vd-framework/common/VDEventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
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

  private _loginView: login_iLoginView = null;
  private _loginSevice: login_iLoginSevice = null;
  private _loginModel: login_iLoginModel = null;
  private _playerModel: login_iPlayerModel = null;
  private _authenTicationSevice: IAuthenticationService = null;
  private _authController: IAuthController = null;

  init(authController: IAuthController) {
    this.initInterfaces(this.LoginView, authController);

    this.RegisterEvents();
  }
  //init
  initInterfaces(iLoginView: login_iLoginView, authControler: IAuthController) {
    this._loginView = iLoginView;
    this._loginSevice = new loginSevice();

    this._loginModel = new login_loginModel();
    this._playerModel = new login_playerModel();
    this._authenTicationSevice = new MockAuthenticationService();

    this._authController = authControler;
  }

  RegisterEvents() {
    this._loginSevice.registerEvent();

    this._loginModel.registerEvent();

    this._playerModel.registerEvent();

    this._loginSevice.Init(this);

    this._loginView.init(this);
  }

  callMoveRegisterNode() {
    this._authController.registerNodeControl(this.node);
  }

  callMovePlayNowNode() {
    this._authController.playNowNodeControl(this.node);
  }

  sendLoginDtaToSever(data: loginDataType_sendToSever) {
    let loginResult = this._authenTicationSevice.process(data.userName, data.password);

    let playerInfo = this._authenTicationSevice.getPlayerInfoPackage(data.userName, data.password);

    VDEventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, loginResult);

    VDEventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL, playerInfo);
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
    this._loginView.showMessenger_userNameWrong("");

    this._loginView.showMessenger_passwordWrong("");
  }

  setShowMsg_userNameWrong() {
    this._loginView.showMessenger_userNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);

    this._loginView.showMessenger_passwordWrong("");
  }

  setShowMsg_passwordWrong() {
    this._loginView.showMessenger_passwordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);

    this._loginView.showMessenger_userNameWrong("");
  }

  setShowMsg_userNameAndPasswordWrong() {
    this._loginView.showMessenger_userNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);

    this._loginView.showMessenger_passwordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);
  }
}
