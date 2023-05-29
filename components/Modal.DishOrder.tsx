import { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Pressable /* don't remove it  they are their for custom buttons*/,
  ScrollView /* don't remove it they are their for custom buttons */,
  Alert,
} from "react-native";
import {
  Chip,
  DataTable,
  List,
  SegmentedButtons,
  Text,
  TextInput as PaperTextInput,
} from "react-native-paper";
import ScreenWrapper from "../ScreenWrapper";
import { height } from "../useFullItems/constants";
import { AntDesign } from "@expo/vector-icons";
import { store, useAppSelector } from "../useFullItems/redux-store";
import { axiosPostFunction } from "../useFullItems/axios/axiosPost";
import { foodPriceStructure } from "../hooks/structureFoodPrice";
import { Dish } from "../interfaces";

interface Props {
  // visible: boolean;
  setVisible: () => void;
  showDishInfoDialog: () => void;
}

const DishOrderingModal = (props: Props) => {
  const { setVisible, showDishInfoDialog } = props;
  const [deleteOrderNowAddToCart, setDeleteOrderNowAddToCart] = useState("");
  const [quantityType, setQuantityType] =
    useState<keyof Dish["price"]>("large");
  const [halfQuantity, setHalfQuantity] = useState("");
  const [fullQuantity, setFullQuantity] = useState("");
  const [orderDescription, setOrderDescription] = useState("");

  const dishId = useAppSelector(
    (store) => store.selectedValues.defaultValues.selectDishId
  );

  const selectedDish = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.dishesh
  ).find((dish) => dish.id === dishId);

  const selectedValues = useAppSelector(
    (store) => store.selectedValues.defaultValues
  );

  const selectedTableSection = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.tables
  )[selectedValues.selectedTableSection];

  const sessionId = useAppSelector((store) => store.tableStatus.tableDetail)?.[
    selectedTableSection.id
  ]?.[selectedValues.tableNumber];

  // const foodPrice = foodPriceStructure(selectedDish!);

  const closeModal = () => {
    setVisible();
  };

  const orderDish = () => {
    const fullDishQuantity = fullQuantity || null,
      halfDishQuantity = halfQuantity || null;

    if (!(halfDishQuantity || fullDishQuantity))
      return Alert.alert("Please select quantity");

    if (!selectedDish) return Alert.alert("Please select dish");

    axiosPostFunction({
      parentUrl: "orders",
      data: {
        dishId: selectedDish.id,
        tableSectionId: selectedTableSection.id,
        tableNumber: selectedValues.tableNumber,
        sessionId,
        user_description: orderDescription,
        size: quantityType,
        halfQuantity: halfDishQuantity,
        fullQuantity: fullDishQuantity,
      },
      thenFunction: closeModal,
    });
  };

  const addToCart = () => {
    const fullDishQuantity = fullQuantity || null,
      halfDishQuantity = halfQuantity || null;

    if (!selectedDish) return Alert.alert("Please select dish");

    axiosPostFunction({
      parentUrl: "cart",
      data: {
        dishId: selectedDish.id,
        tableSectionId: selectedTableSection.id,
        tableNumber: selectedValues.tableNumber,
        sessionId,
        user_description: orderDescription,
        size: quantityType,
        halfQuantity: halfDishQuantity,
        fullQuantity: fullDishQuantity,
      },
      thenFunction: closeModal,
    });
  };

  const selectQuantity = (halfFull: "half" | "full", quantity: number) => {
    const stringQuantity = quantity.toString();
    if (halfFull === "half") {
      if (halfQuantity === stringQuantity) setHalfQuantity("");
      else setHalfQuantity(stringQuantity);
    } else if (halfFull === "full") {
      if (fullQuantity === stringQuantity) setFullQuantity("");
      else setFullQuantity(stringQuantity);
    }
  };

  const disableQuantityButton = (size: "half" | "full") =>
    !selectedDish?.price[quantityType]?.[size];

  const selectSize = (value: keyof Dish["price"]) => {
    setHalfQuantity("");
    setFullQuantity("");
    setQuantityType(value);
  };

  return (
    <Modal visible={true} transparent={true}>
      <ScreenWrapper style={{ backgroundColor: "#000000ab" }}>
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            // top: 50,
            height,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              width: "90%",
              padding: 10,
              backgroundColor: "white",
              borderRadius: 30,
            }}
          >
            <View style={{ position: "relative" }}>
              <Text
                variant="titleLarge"
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                {selectedDish?.name}
              </Text>
              <AntDesign
                style={{ position: "absolute", right: 0 }}
                name="infocirlceo"
                size={24}
                color="black"
                onPress={showDishInfoDialog}
              />
            </View>
            <List.Section>
              <SegmentedButtons
                value={quantityType}
                onValueChange={(value) => {
                  if (
                    value === "large" ||
                    value === "medium" ||
                    value === "small"
                  )
                    selectSize(value);
                }}
                buttons={[
                  {
                    value: "large",
                    label: "Large",
                    disabled: !selectedDish?.price.large,
                  },
                  {
                    value: "medium",
                    label: "Medium",
                    disabled: !selectedDish?.price.medium,
                  },
                  {
                    value: "small",
                    label: "Small",
                    disabled: !selectedDish?.price.small,
                  },
                ]}
              />
            </List.Section>

            <DataTable style={{ marginVertical: 8 }}>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text variant="titleMedium">Half</Text>
                </DataTable.Cell>
                <Chip
                  disabled={disableQuantityButton("half")}
                  onPress={() => selectQuantity("half", 1)}
                  style={[
                    styles.numberChip,
                    {
                      borderTopLeftRadius: 15,
                      backgroundColor: halfQuantity === "1" ? "pink" : "snow",
                    },
                  ]}
                >
                  1
                </Chip>
                <Chip
                  disabled={disableQuantityButton("half")}
                  onPress={() => selectQuantity("half", 2)}
                  style={[
                    styles.numberChip,
                    {
                      backgroundColor: halfQuantity === "2" ? "pink" : "snow",
                    },
                  ]}
                >
                  2
                </Chip>
                <Chip
                  disabled={disableQuantityButton("half")}
                  onPress={() => selectQuantity("half", 3)}
                  style={[
                    styles.numberChip,
                    {
                      backgroundColor: halfQuantity === "3" ? "pink" : "snow",
                    },
                  ]}
                >
                  3
                </Chip>

                <TextInput
                  placeholder="custom"
                  keyboardType="number-pad"
                  value={halfQuantity}
                  editable={!disableQuantityButton("half")}
                  onChangeText={setHalfQuantity}
                  style={[
                    styles.customInput,
                    {
                      borderTopRightRadius: 15,
                      backgroundColor: halfQuantity > "3" ? "pink" : "snow",
                    },
                  ]}
                />
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>
                  <Text variant="titleMedium">Full</Text>
                </DataTable.Cell>
                <Chip
                  disabled={disableQuantityButton("full")}
                  onPress={() => selectQuantity("full", 1)}
                  style={[
                    styles.numberChip,
                    {
                      borderBottomLeftRadius: 15,
                      backgroundColor: fullQuantity === "1" ? "pink" : "snow",
                    },
                  ]}
                >
                  1
                </Chip>
                <Chip
                  disabled={disableQuantityButton("full")}
                  onPress={() => selectQuantity("full", 2)}
                  style={[
                    styles.numberChip,
                    {
                      backgroundColor: fullQuantity === "2" ? "pink" : "snow",
                    },
                  ]}
                >
                  2
                </Chip>
                <Chip
                  disabled={disableQuantityButton("full")}
                  onPress={() => selectQuantity("full", 3)}
                  style={[
                    styles.numberChip,
                    {
                      backgroundColor: fullQuantity === "3" ? "pink" : "snow",
                    },
                  ]}
                >
                  3
                </Chip>

                <TextInput
                  placeholder="custom"
                  keyboardType="number-pad"
                  value={fullQuantity}
                  editable={!disableQuantityButton("full")}
                  onChangeText={setFullQuantity}
                  style={[
                    styles.customInput,
                    {
                      borderBottomRightRadius: 15,
                      backgroundColor: fullQuantity > "3" ? "pink" : "snow",
                    },
                  ]}
                />
              </DataTable.Row>
            </DataTable>
            <PaperTextInput
              mode="outlined"
              // style={styles.inputContainerStyle}
              label="Order description"
              value={orderDescription}
              onChangeText={setOrderDescription}
              placeholder="Type something"
              style={{ marginVertical: 8 }}
              // value={outlinedText}
              // onChangeText={(outlinedText) =>
              //   inputActionHandler("outlinedText", outlinedText)
              // }

              // right={<PaperTextInput.Affix text="/100" />}
            />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginVertical: 8,
              }}
            >
              {selectedDish?.addOns.map((addons) => (
                <Chip
                  mode="outlined"
                  key={addons.id}
                  onPress={() => {}}
                  style={{ margin: 4 }}
                >
                  {addons.name}
                </Chip>
              ))}
            </View>
            {/* <View style={{ flexDirection: "row", marginTop: 6 }}>         Dont't delete it is is custom buttons
              <Pressable style={{ borderWidth: 1, flexGrow: 1 }}>
                <Text
                  variant="titleLarge"
                  style={{ textAlign: "center", paddingVertical: 5 }}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </Text>
              </Pressable>
              <Pressable style={{ borderWidth: 1, flexGrow: 1 }}>
                <Text
                  variant="titleLarge"
                  style={{ textAlign: "center", paddingVertical: 5 }}
                >
                  Order Now
                </Text>
              </Pressable>
              <Pressable style={{ borderWidth: 1, flexGrow: 1 }}>
                <Text
                  variant="titleLarge"
                  style={{ textAlign: "center", paddingVertical: 5 }}
                >
                  Add To Cart
                </Text>
              </Pressable>
            </View> */}
            <SegmentedButtons
              value={deleteOrderNowAddToCart}
              onValueChange={setDeleteOrderNowAddToCart}
              style={{ marginVertical: 8 }}
              buttons={[
                {
                  value: "walk",
                  icon: "delete",
                  label: "Delete",
                  onPress: closeModal,
                },
                {
                  value: "train",
                  icon: "food",
                  label: "Order now",
                  onPress: orderDish,
                },
                {
                  value: "drive",
                  icon: "cart",
                  label: "Add to cart",
                  onPress: addToCart,
                },
              ]}
            />
          </View>
        </View>
      </ScreenWrapper>
    </Modal>
  );
};

export default DishOrderingModal;

const styles = StyleSheet.create({
  customInput: {
    textAlign: "center",
    backgroundColor: "#efa2a217",
    borderRadius: 0,
    width: 65,
    fontWeight: "bold",
  },
  numberChip: { backgroundColor: "#efa2a217", borderRadius: 0 },
});
