import { useState } from "react";
import { Divider, List, Searchbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList } from "react-native";

/* import components */

import DishOrderingModal from "../../components/Modal.DishOrder";
import DishInfoDialog from "../../components/Dialog.DishOrder";
import {
  useAppSelector,
  useAppDispatch,
  action_types,
} from "../../useFullItems/redux-store";
import { Dish } from "../../interfaces";

function SelectDish() {
  const [orderModal, setOrderModal] = useState(false);
  const [searchResult, setSearchReault] = useState("");
  const [showDishInfoDialog, setShowDishInfoDialog] = useState(false);
  const dishesh = useAppSelector(
    (store) => store.restaurantInfo.defaultValues.dishesh
  )?.filter((dish) => dish.name.match(new RegExp(searchResult, "gi")));

  const dispatch = useAppDispatch();

  const toggleOrderModal = () => setOrderModal(!orderModal);

  const safeArea = useSafeAreaInsets();

  const renderItem = ({ item, index }: { item: Dish; index: number }) => {
    return (
      <List.Item
        // disabled
        title={item.name}
        // style={{backgroundColor:'grey'}}
        onPress={() => {
          dispatch(action_types.selectDishId(item.id));
          toggleOrderModal();
        }}
      />
    );
  };

  const keyExtractor = (item: Dish) => item.id;
  return (
    <>
      {orderModal && (
        <DishOrderingModal
          showDishInfoDialog={() => setShowDishInfoDialog(true)}
          setVisible={toggleOrderModal}
          // visible={orderModal}
        />
      )}
      <DishInfoDialog
        close={() => setShowDishInfoDialog(false)}
        visible={showDishInfoDialog}
      />

      <Searchbar
        placeholder="Search"
        value={searchResult}
        onChangeText={setSearchReault}
      />

      <FlatList
        contentContainerStyle={{
          // backgroundColor: colors.background,
          paddingBottom: safeArea.bottom,
          paddingLeft: safeArea.left,
          paddingRight: safeArea.right,
        }}
        // style={{
        //   backgroundColor: colors.background,
        // }}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={dishesh}
      />
    </>
  );
}

export default SelectDish;

// const styles = StyleSheet.create({});
