import { loginResult } from "../dataModel/loginDataType_sendToClient";
import { playerInfoPackage } from "../dataModel/playerDataType";
import { loginDataType_sendToSever } from "../dataModel/loginDataType_sendToSever";

export interface login_iAuthView {
  NodeMovingToLeft(CenterNode, rightNode): void;
}
export interface login_iRegisterSevice {
  checkRegisterData(msgData): void;
}
export interface login_iLoginView {
  showMessenger_userNameWrong(msg): void;
  showMessenger_passwordWrong(msg): void;
  resetAllMessenger(): void;
  init(loginControler: ILoginController);
}
export interface IRegisterView {
  init(registerControl: IRegisterController): void;
}
export interface login_iLoginSevice {
  Init(loginController: ILoginController);
  registerEvent();
}
export interface login_iLoginModel {
  registerEvent();
}
export interface login_iPlayerModel {
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
