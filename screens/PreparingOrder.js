import { Image, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrder = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      {/* <Animatable.Image
        source={require('../assets/order.gif')}
        animation="slideInUp"
        iterationCount={1}
        className="h-screen  w-screen rounded-md"
      ></Animatable.Image> */}
      <Image
        source={{
          uri: 'https://links.papareact.com/fls',
        }}
        className="h-32 w-32"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-black font-bold text-center"
      >
        Waiting for resaurant to accept your order!
      </Animatable.Text>

      <Progress.Bar size={60} indeterminate={true} color="#00ccbb" />
    </SafeAreaView>
  );
};

export default PreparingOrder;
