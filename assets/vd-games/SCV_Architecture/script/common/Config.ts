import { VDGameConfig } from "../../../../vd-framework/common/VDGameConfig";

export type ConfigType = VDGameConfig & {
    win_coin: number
};

export const Config: ConfigType = {
    GAME_ID: '1000',
    GAME_NAME: 'domino',
    versionGame: '1.0.0',
    isShowFPS: true,
    isUnitTest: true,
    //------ extends
    win_coin: 1000
};

