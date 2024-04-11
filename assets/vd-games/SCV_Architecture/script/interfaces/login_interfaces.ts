import { loginResult } from "../dataModel/loginDataType_sendToClient";
import { playerInfoPackage } from "../dataModel/playerDataType";
import { loginDataType_sendToSever } from "../dataModel/loginDataType_sendToSever";

export interface IAuthView_login {
  NodeMovingToLeft(CenterNode, rightNode): void;
}

export interface IRegisterSevice_login {
  checkRegisterData(msgData): void;
}

export interface ILoginView_login {
  showMessenger_userNameWrong(msg): void;
  showMessenger_passwordWrong(msg): void;
  resetAllMessenger(): void;
  init(loginControler: ILoginController);
}

export interface IRegisterView {
  init(registerControl: IRegisterController): void;
}

export interface ILoginSevice_login {
  Init(loginController: ILoginController);
  registerEvent();
}

export interface ILoginModel_login {
  registerEvent();
}

export interface IPlayerModel_login {
  registerEvent();
}

export interface IAuthenticationService {
  process(username: string, password: string): loginResult;
  getPlayerInfoPackage(userName: string, password: string): playerInfoPackage;
}

export interface IAuthController {
  registerNodeControl(centerNode);
  loginNodeControl(centerNode);
  playNowNodeControl(centerNode);
}

export interface ILoginController {
  init(authController: IAuthController);
  callMoveRegisterNode();
  callMovePlayNowNode();
  sendLoginDtaToSever(data: loginDataType_sendToSever);
  switchToTheHomeScreen();
  setShowMsg_userNameWrong();
  setShowMsg_passwordWrong();
  setShowMsg_userNameAndPasswordWrong();
}

export interface IPlayNowController {
  init(authController: IAuthController);
  callMoveLoginNode();
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
