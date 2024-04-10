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
}
export interface IRegisterView {
  init(registerControl: IRegisterController): void;
}
export interface login_iLoginSevice {
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
  callToAuthCtr_callRegisterNode();
  callToAuthCtr_callPlayNowNode();
  sendLoginDtaToSever(data: loginDataType_sendToSever);
  switchToTheHomeScreen();
  setShowMsg_userNameWrong();
  setShowMsg_passwordWrong();
  setShowMsg_userNameAndPasswordWrong();
}
export interface IPlayNowController {
  callToAuthCtr_callLoginNode();
  callToAuthCtr_callRegisterNode();
}
export interface IRegisterController {
  AuthCtr_LoginNode();
  callToAuthCtr_CallPlayNowNode();
  checkRegisterData(msgData);
  init(authController: IAuthController);
}
