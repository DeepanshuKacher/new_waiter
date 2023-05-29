import { action_types, store } from "../../redux-store";
import { axiosGetFunction } from "../../axios/axiosGet";

export const fetchAndStoreTableSession = async () => {
  const data = await axiosGetFunction({
    parentUrl: "sessions",
  });

  const tableSessions: any = {};

  for (let x in data) {
    const [tableSectionId, tableNumber] = x.split(":"),
      [sessionId] = data[x].split(":");

    tableSessions[tableSectionId] = tableSessions[tableSectionId] || {};
    tableSessions[tableSectionId][tableNumber] = sessionId;
  }

  store.dispatch(action_types.loadTableStatus(tableSessions));
};
