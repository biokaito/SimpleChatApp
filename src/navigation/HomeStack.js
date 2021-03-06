import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HomeScreen from '../screens/Home'

const Stack = createStackNavigator()

export default function HomeStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" componen={HomeScreen} />
        </Stack.Navigator>
    )
}