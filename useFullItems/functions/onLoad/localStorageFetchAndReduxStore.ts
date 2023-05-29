import { getLocalStorageData } from "../../localStorage";
import { action_types, store } from "../../redux-store";
import { SettingType } from "../../redux-store/settings";

export const localStorageFunctons = async () => {
  const settings: SettingType | undefined = await getLocalStorageData(
    "waiterSetting"
  );

  if (settings) store.dispatch(action_types.updateSettings(settings));
};
