import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow-sm"
      onPress={() => {
        navigation.navigate('Restaurant', {
          props,
        });
      }}
    >
      <Image
        source={{
          uri: urlFor(props.imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{props.title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{props.rating}</Text> .{' '}
            {props.genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500 w-52">
            Nearby . {props.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
