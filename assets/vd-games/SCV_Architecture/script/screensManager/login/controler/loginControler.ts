import { _decorator, Component, Prefab, instantiate, sp } from "cc";
import { EventListener } from "../../../../../../vd-framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import ScreenManager from "../../../../../../vd-framework/ui/ScreenManager";
import BaseScreen from "../../../../../../vd-framework/ui/BaseScreen";
import { MESSENGER_DEFINE, Path } from "../../../common/Path";
import { IAuthController, IAuthenticationService, ILoginController, ILoginModel_login, ILoginSevice_login, ILoginView_login, IPlayerModel_login } from "../../../interfaces/login_interfaces";
import { loginView } from "../view/loginView";
import { loginSevice } from "../sevice/loginSevice";
import { login_loginModel } from "../model/login_loginModel";
import { login_playerModel } from "../model/login_playerModel";
import { loginData } from "../../../dataModel/loginDataType_sendToSever";
import { MockAuthenticationService } from "../sevice/MockAuthenticationService";
const { ccclass, property } = _decorator;

@ccclass("loginControler")
export class loginControler extends Component implements ILoginController {
  @property(loginView)
  LoginView: loginView = null;

  private _loginView: ILoginView_login = null;
  private _loginSevice: ILoginSevice_login = null;
  private _loginModel: ILoginModel_login = null;
  private _playerModel: IPlayerModel_login = null;

  private _authenTicationSevice: IAuthenticationService = null;

  private _authController: IAuthController = null;

  init(authController: IAuthController) {
    this.initInterfaces(this.LoginView, authController);

    this.RegisterEvents();
  }
  //init

  initInterfaces(iLoginView: ILoginView_login, authControler: IAuthController) {
    this._loginView = iLoginView;
    this._authController = authControler;

    this._loginSevice = new loginSevice();
    this._authenTicationSevice = new MockAuthenticationService();

    this._loginModel = new login_loginModel();
    this._playerModel = new login_playerModel();
  }

  RegisterEvents() {
    this._playerModel.registerEvent();

    this._loginModel.init(this._loginSevice);

    this._loginSevice.Init(this);

    this._loginView.init(this);
  }

  moveRegisterNodeToScreen() {
    this._authController.moveRegisterNodeToCenter(this.node);
  }

  movePlayNowNodeToScreen() {
    this._authController.movePlayNowNodeToCenter(this.node);
  }

  onLogin(data: loginData) {
    let loginResult = this._authenTicationSevice.process(data.userName, data.password);

    let playerInfo = this._authenTicationSevice.getPlayerInfoPackage(data.userName, data.password);

    EventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, loginResult);

    EventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL, playerInfo);
  }

  switchToTheHomeScreen() {
    this.resetShowMessenger();
    let pfFxCloud = ScreenManager.instance.assetBundle.get(Path.TRANSITION_CLOUD, Prefab)!;
    let nodeCloud = instantiate(pfFxCloud);

    ScreenManager.instance.showEffect(nodeCloud);

    let spineCloud = nodeCloud.getComponent(sp.Skeleton);

    let entry = spineCloud.setAnimation(0, "transition_to_lucky", false);

    spineCloud.setTrackCompleteListener(entry, (x: any, ev: any) => {
      ScreenManager.instance.removeAllEffects();
    });
    spineCloud.setTrackEventListener(entry, (x: any, ev: any) => {
      if (ev && ev.data && ev.data.name && ev.data.name == "transition") {
        let play_screen = ScreenManager.instance.assetBundle.get(Path.HOME_SCREEN, Prefab)!;

        ScreenManager.instance.pushScreen(play_screen, (screen: BaseScreen) => {}, true);
      }
    });
  }

  resetShowMessenger() {
    this._loginView.showUserNameWrong("");

    this._loginView.showPasswordWrong("");
  }

  setShowMsg_userNameWrong() {
    this._loginView.showUserNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);

    this._loginView.showPasswordWrong("");
  }

  setShowMsg_passwordWrong() {
    this._loginView.showPasswordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);

    this._loginView.showUserNameWrong("");
  }

  setShowMsg_userNameAndPasswordWrong() {
    this._loginView.showUserNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);

    this._loginView.showPasswordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);
  }
}
