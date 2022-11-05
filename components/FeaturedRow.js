import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';

const FeaturedRow = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
  *[_type=="featured" && _id==$id] {
    ...,
    restaurants[]->{
      ...,
      dishes[]->,
      type-> {
        name
      }
    },
  }[0]
  `,
        { id: props.id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [props.id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{props.title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-gray-500 px-4 text-xs">{props.description}</Text>

      <ScrollView
        className="pt-4"
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            short_desc={restaurant.short_description}
            genre={restaurant.type?.name}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
