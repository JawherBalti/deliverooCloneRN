import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const CategoryCard = (props) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: props.imgUrl,
        }}
        className="h-24 w-24 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
