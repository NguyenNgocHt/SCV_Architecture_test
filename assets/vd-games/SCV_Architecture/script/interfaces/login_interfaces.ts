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
