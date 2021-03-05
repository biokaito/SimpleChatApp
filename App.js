import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Chat from './src/component/Chat'
import Login from './src/component/Login'
import CreateAccount from './src/component/CreateAccount'


const Stack = createStackNavigator();

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;