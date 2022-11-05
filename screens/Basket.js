import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';

const Basket = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, []);

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <View className="flex-1 bg-gray-100">
        <View className="flex flex-row justify-center items-center p-4 border-b border-[#00ccbb] bg-white shadow-xs">
          <View className="w-full">
            <Text className="text-lg font-bold text-center">Basket</Text>
          </View>

          <TouchableOpacity
            className="rounded-full bg-gray-100 right-5 absolute"
            onPress={navigation.goBack}
          >
            <XCircleIcon color="#00ccbb" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-2">
          <Image
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00ccbb]">{items.length} x</Text>
              <Image
                className="h-12 w-12 rounded-full"
                source={{ uri: urlFor(items[0]?.image).url() }}
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">${items[0]?.price}</Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket(key))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-4 bg-white mt-1 space-y-3">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">${total}</Text>
          </View>
        </View>

        <View className="p-4 bg-white mt-1 space-y-3">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">$5.99</Text>
          </View>
        </View>
        {total + 5.99 > 5.99 ? (
          <View className="p-4 bg-white mt-1 space-y-3">
            <View className="flex-row justify-between">
              <Text>Order Total</Text>
              <Text className="font-extrabold">${total + 5.99}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('PreparingOrder')}
              className="rounded-lg bg-[#00ccbb] p-4"
            >
              <Text className="text-center text-white text-lg font-bold">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Basket;
