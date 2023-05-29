import { Button, Portal, Dialog, MD2Colors, Text } from "react-native-paper";
import { axiosPostFunction } from "../useFullItems/axios/axiosPost";
import { useAppSelector } from "../useFullItems/redux-store";
import { useState } from "react";

const StartSessionDialog = ({
  visible,
  close,
  navigationFunction,
}: {
  visible: boolean;
  close: () => void;
  navigationFunction: any;
}) => {
  const [disableAgreeButton, setDisableAgreeButton] = useState(false);

  const selectedTableSection = useAppSelector(
    (store) => store.selectedValues.defaultValues.selectedTableSection
  );

  const tableSections = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.tables
  )[selectedTableSection];

  const tableNumber = useAppSelector(
    (store) => store.selectedValues.defaultValues.tableNumber
  );

  const startSession = () => {
    setDisableAgreeButton(true);
    axiosPostFunction({
      parentUrl: "sessions",
      data: {
        tableSectionId: tableSections.id,
        tableNumber: tableNumber,
      },
      thenFunction: () => {
        close();
        setDisableAgreeButton(false);
      },
    });
  };

  const dontStartSession = () => {
    close();
    navigationFunction.goBack();
  };

  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible} dismissable={false}>
        <Dialog.Title>Start Session</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">
            Start Session for table {tableSections?.prefix}
            {tableNumber}
            {tableSections?.suffix}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={MD2Colors.teal500} onPress={dontStartSession}>
            Disagree
          </Button>
          <Button disabled={disableAgreeButton} onPress={startSession}>
            Agree
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default StartSessionDialog;
