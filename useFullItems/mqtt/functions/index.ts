import { action_types, store } from "../../redux-store";

export const updateTableStatus = ({
  tableSectionId,
  tableNumber,
  status,
}: {
  tableSectionId: string;
  tableNumber: number;
  status: null | string;
}) => {
  store.dispatch(
    action_types.updateTableStatus({
      status,
      tableNumber,
      tableSectionId,
    })
  );
};
