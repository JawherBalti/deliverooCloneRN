import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from '../features/basketSlice';

const DishRow = (props) => {
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) =>
    selectBasketItemsWithId(state, props.id)
  );

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(props));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket(props.id));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white p-4 border-gray-200 ${isPressed && 'border-b-0'}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{props.name}</Text>
            <Text className="text-gray-400">{props.description}</Text>
            <Text className="text-green-400 mt-2">${props.price}</Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(props.image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed ? (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                color={items.length > 0 ? '#00CCBB' : 'gray'}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items?.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default DishRow;
