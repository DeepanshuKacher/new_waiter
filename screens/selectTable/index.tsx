import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { RootTabScreenProps } from "../../types";
import ScreenWrapper from "../../ScreenWrapper";
import {
  useAppSelector,
  useAppDispatch,
  action_types,
} from "../../useFullItems/redux-store";
import StartSessionDialog from "../../components/StartSessionDialog";

function Tables({ navigation }: RootTabScreenProps<"Tables">) {
  const [tables, setTables] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const selectedTableSection = useAppSelector(
    (store) => store.selectedValues.defaultValues.selectedTableSection
  );

  const tableSections = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.tables
  )[selectedTableSection];

  const tablesStatus = useAppSelector((store) => store.tableStatus.tableDetail)[
    tableSections?.id
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    const temp: number[] = [];
    for (let i = tableSections?.startNumber; i <= tableSections?.endNumber; i++) {
      temp.push(i);
    }
    setTables(temp);
  }, [tableSections]);

  return (
    <ScreenWrapper>
      <StartSessionDialog
        navigationFunction={navigation}
        close={() => setShowDialog(false)}
        visible={showDialog}
      />
      <View style={styles.row}>
        {tables.map((table) => (
          <Text
            // mode="outlined"
            key={table}
            // variant="bodyLarge"
            onPress={() => {
              if (!tablesStatus?.[table]) setShowDialog(true);
              dispatch(action_types.selectTableNumber(table));
              navigation.navigate("Dishes");
            }}
            onLongPress={() => {
              dispatch(action_types.selectTableNumber(table));
              navigation.navigate("Cart");
            }}
            style={{
              ...styles.button,
              backgroundColor: tablesStatus?.[table] ? "snow" : "green",
            }}
          >
            {tableSections?.prefix}
            {table}
            {tableSections?.suffix}
          </Text>
        ))}

        {/* <Button mode="outlined" onPress={() => {}} style={styles.button}>
          2
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          3
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          4
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          5
        </Button>
        <Button mode="outlined" onPress={() => {}} style={styles.button}>
          6
        </Button> */}
      </View>
    </ScreenWrapper>
  );
}

export default Tables;

const styles = StyleSheet.create({
  button: {
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 80,
    textAlign: "center",
    borderRadius: 40,
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    alignItems: "center",
    paddingVertical: 12,
  },
});
