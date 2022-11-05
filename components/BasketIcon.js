import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  return items.length !== 0 ? (
    <View className="w-full">
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className=" bg-[#00CCBB] p-5  flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#00aa9c] py-1 px-2 rounded-full">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">$ {total}</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default BasketIcon;
