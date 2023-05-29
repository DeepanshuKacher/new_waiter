import { Modal, Pressable } from "react-native";
import { Text, DataTable } from "react-native-paper";
import { useAppSelector } from "../useFullItems/redux-store";
import { Dish } from "../interfaces";

interface Props {
  visible: boolean;
  close: () => void;
}

const returnDataTableCell = (
  selectedDish: Dish | undefined,
  halfFull: keyof Dish["price"]["large"],
  size: keyof Dish["price"]
) => {
  if (selectedDish?.price[size][halfFull])
    return (
      <DataTable.Cell>
        ₹{selectedDish?.price?.[size]?.[halfFull]}
      </DataTable.Cell>
    );
  else return <DataTable.Cell>Nil</DataTable.Cell>;
};

const returnDateTableRow = (
  size: keyof Dish["price"],
  selectedDish: Dish | undefined
) => {
  if (selectedDish?.price[size])
    return (
      <DataTable.Row>
        <DataTable.Title>{size}</DataTable.Title>
        {returnDataTableCell(selectedDish, "half", size)}
        {returnDataTableCell(selectedDish, "full", size)}
      </DataTable.Row>
    );
  else return null;
};

function DishInfoDialog(props: Props) {
  const { close, visible } = props;

  const dishId = useAppSelector(
    (store) => store.selectedValues.defaultValues.selectDishId
  );

  const selectedDish = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.dishesh
  ).find((dish) => dish.id === dishId);
  return (
    <Modal visible={visible} transparent>
      <Pressable
        style={{
          backgroundColor: "#000000ab",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        onPress={close}
      >
        <Pressable
          style={{
            width: "80%",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
          }}
        >
          {/* <View
              style={{
                width: "80%",
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
            > */}
          <Text
            variant="titleLarge"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            {selectedDish?.name}
          </Text>
          <Text variant="bodyLarge" style={{ paddingHorizontal: 10 }}>
            {selectedDish?.description}
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title> </DataTable.Title>
              <DataTable.Title>Half</DataTable.Title>
              <DataTable.Title>Full</DataTable.Title>
            </DataTable.Header>
            {returnDateTableRow("large", selectedDish)}
            {returnDateTableRow("medium", selectedDish)}
            {returnDateTableRow("small", selectedDish)}
          </DataTable>
          {/* </View> */}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default DishInfoDialog;

/* import { Dimensions, ScrollView, TextComponent } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

interface Props {
  visible: boolean;
  close: () => void;
}

function DishInfoDialog(props: Props) {
  const { close, visible } = props;
  return (
    <Portal>
      <Dialog
        onDismiss={close}
        visible={visible}
        style={{ maxHeight: 0.6 * Dimensions.get("window").height }}
      >
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.ScrollArea
        // style={styles.smallPadding}
        >
          <ScrollView
          // contentContainerStyle={styles.biggerPadding}
          >
            <TextComponent>
              Material is the metaphor
              {"\n"}
              {"\n"}A material metaphor is the unifying theory of a rationalized
              space and a system of motion. The material is grounded in tactile
              reality, inspired by the study of paper and ink, yet
              technologically advanced and open to imagination and magic.
              {"\n"}
              {"\n"}
              Surfaces and edges of the material provide visual cues that are
              grounded in reality. The use of familiar tactile attributes helps
              users quickly understand affordances. Yet the flexibility of the
              material creates new affordances that supersede those in the
              physical world, without breaking the rules of physics.
              {"\n"}
              {"\n"}
              The fundamentals of light, surface, and movement are key to
              conveying how objects move, interact, and exist in space and in
              relation to each other. Realistic lighting shows seams, divides
              space, and indicates moving parts.
              {"\n"}
              {"\n"}A material metaphor is the unifying theory of a rationalized
              space and a system of motion. The material is grounded in tactile
              reality, inspired by the study of paper and ink, yet
              technologically advanced and open to imagination and magic.
              {"\n"}
              {"\n"}
              Surfaces and edges of the material provide visual cues that are
              grounded in reality. The use of familiar tactile attributes helps
              users quickly understand affordances. Yet the flexibility of the
              material creates new affordances that supersede those in the
              physical world, without breaking the rules of physics.
              {"\n"}
              {"\n"}
              The fundamentals of light, surface, and movement are key to
              conveying how objects move, interact, and exist in space and in
              relation to each other. Realistic lighting shows seams, divides
              space, and indicates moving parts.
            </TextComponent>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={close}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default DishInfoDialog;
 */
