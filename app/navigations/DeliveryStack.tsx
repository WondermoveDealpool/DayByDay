import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Complete from '../screens/MainTab/Complete';
import Ing from '../screens/MainTab/Ing';

const Stack = createNativeStackNavigator();

const Delivery = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ing" component={Ing} options={{title: '내 오더'}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{title: '완료하기'}}
      />
    </Stack.Navigator>
  );
};

export default Delivery;