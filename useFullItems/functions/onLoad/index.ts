import { fetchAndStoreTableSession } from "./axiosFetchAndStore";
import { checkCommit } from "./checkCommit";
import { fetchAllDataAndStore } from "./fetchAllDataAndStore";
import { localStorageFunctons } from "./localStorageFetchAndReduxStore";
export const onLoad = async () => {
  try {
     await checkCommit();

    // const fetchAndStoreTableSessionPromis = fetchAndStoreTableSession();
    // const localStorageFunctonsPromis = localStorageFunctons();
    await Promise.all([fetchAndStoreTableSession(), localStorageFunctons()]);
  } catch (error) {
    alert("Some Error");
    console.log(error);
  }
};
