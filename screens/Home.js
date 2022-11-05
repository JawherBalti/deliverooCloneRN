import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const Home = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  //useeffect when the component loads
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type=="featured"] {
        ...,
        restaurants[]-> {
          ...,
          dishes[] ->
        }
      }
      `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  //uselayout when the ui loads
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>

          <View className="flex-row items-center">
            <Text className="font-bold text-xl ">Current Location</Text>
            <ChevronDownIcon size={20} color="#00CCBB" />
          </View>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* input */}
      <View className="flex-row items-center space-x-2 pb-2 mx-2">
        <View className="flex-row items-center space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />

          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
            className=" w-11/12"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        {/* categories */}
        <Categories />
        {/* featured Rows */}

        {featuredCategories?.map((cat) => (
          <FeaturedRow
            key={cat._id}
            id={cat._id}
            title={cat.name}
            description={cat.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
