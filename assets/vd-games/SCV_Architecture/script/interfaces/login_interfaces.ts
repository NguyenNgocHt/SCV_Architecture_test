import { loginResult } from "../dataModel/loginDataType_sendToClient";
import { playerInfoPackage } from "../dataModel/playerDataType";
import { loginData } from "../dataModel/loginDataType_sendToSever";

export interface IAuthView_login {
  NodeMovingToLeft(CenterNode, rightNode): void;
}

export interface IRegisterSevice_login {
  checkRegisterData(msgData): void;
}

export interface ILoginView_login {
  showUserNameWrong(msg): void;

  showPasswordWrong(msg): void;

  resetAllMessenger(): void;

  init(loginControler: ILoginController);
}

export interface IRegisterView {
  init(registerControl: IRegisterController): void;
}

export interface ILoginSevice_login {
  Init(loginController: ILoginController);
  checkLoginResultData(loginResult: loginResult);
}

export interface ILoginModel_login {
  init(loginService: ILoginSevice_login);
}

export interface IPlayerModel_login {
  registerEvent();
}

export interface IAuthenticationService {
  process(username: string, password: string): loginResult;

  getPlayerInfoPackage(userName: string, password: string): playerInfoPackage;
}

export interface IAuthController {
  moveRegisterNodeToCenter(centerNode);

  moveloginNodeToCenter(centerNode);

  movePlayNowNodeToCenter(centerNode);
}

export interface ILoginController {
  init(authController: IAuthController);

  moveRegisterNodeToScreen();

  movePlayNowNodeToScreen();

  onLogin(data: loginData);

  switchToTheHomeScreen();

  setShowMsg_userNameWrong();

  setShowMsg_passwordWrong();

  setShowMsg_userNameAndPasswordWrong();
}

export interface IPlayNowController {
  init(authController: IAuthController);

  moveLoginPopup();

  callMoveRegisterNode();
}

export interface IRegisterController {
  init(authController: IAuthController);

  callMoveLoginNode();

  callMovePlayNowNode();

  checkRegisterData(msgData);
}

export interface IPlayNowView {
  init(playNowController: IPlayNowController);
}
