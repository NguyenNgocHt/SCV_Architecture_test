import { _decorator, Component, Node } from "cc";
import { HomeScreenView } from "../screensManager/home/view/HomeScreenView";
const { ccclass, property } = _decorator;

@ccclass("director")
export class director extends Component {
  private static _instance: director = null!;

  public static get instance(): director {
    if (this._instance == null) {
      this._instance = new director();
    }

    return this._instance;
  }
  homeScreen: HomeScreenView | null = null;
  
}
