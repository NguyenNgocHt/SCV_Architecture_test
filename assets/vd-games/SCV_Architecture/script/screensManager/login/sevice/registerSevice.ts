import { _decorator, Component, Node } from "cc";
import { registerDataType_sendToSever } from "../../../dataModel/loginDataType_sendToSever";
import { login_iRegisterSevice } from "../../../interfaces/login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("registerSevice")
export class registerSevice implements login_iRegisterSevice {
  private static _instance: registerSevice | null = null;
  public static get instance(): registerSevice {
    if (this._instance == null) {
      this._instance = new registerSevice();
    }
    return this._instance;
  }
  password_numberCharacterMin: number = 6;
  checkRegisterData(msgData: registerDataType_sendToSever) {
    let checkData = msgData;
    console.log("check data", checkData);
    if (checkData.password.length >= this.password_numberCharacterMin && checkData.passwordConfirm.length >= this.password_numberCharacterMin) {
      console.log("check so luong ký tự hợp lệ");
      let isDuplicatePassword = this.checkDuplicatePassword(checkData.password, checkData.passwordConfirm);
        if (isDuplicatePassword) {
          //gui len register controler send data ok
        console.log("check duplicate hơp lệ");
        } else {
            // gửi lên registerControler send data false ko trùng password
        console.log("check duplicate không hợp lệ");
      }
    } else {
        if (checkData.password.length < this.password_numberCharacterMin) {
          //gửi lên registerControler send data false password nhỏ hơn 6 ký tự
        console.log("password nhỏ hơn 6 ky tự");
      }
        if (checkData.passwordConfirm.length < this.password_numberCharacterMin) {
          //gửi lên registerControler send data false
        console.log("password confirm nhỏ hơn 6 ky tự");
      }
    }
  }
  checkDuplicatePassword(password: string, passwordConfirm: string): boolean {
    if (password === passwordConfirm) {
      return true;
    } else {
      return false;
    }
  }
}
