import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {IconButton} from 'react-native-paper'

import HomeScreen from '../screens/Home';
import CreateChannelScreen from '../screens/CreateChannel';
import ChatScreen from '../screens/Chat';
import BrowseChannelScreen from '../screens/BrowseChannelScreen'

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack(){
    return(
        <ModalStack.Navigator mode="modal" headerMode="none">
            <ModalStack.Screen name="ChatApp" component={ChatComponent} />
            <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
        </ModalStack.Navigator>
    );
}

function ChatComponent(){
    return(
        <ChatStack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: '#5b3a70',
                },
                headerTintColor: '#fff',
                headerTitleStyle:{
                    fontSize: 22,
                }
            }}
        >
            <ChatStack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                headerRight: () => (
                    <IconButton
                        icon="plus"
                        size={28}
                        color="#ffffff"
                        onPress={() => navigation.navigate('BrowseChannels')}
                    />
                ),
                })}
            />            
            <ChatStack.Screen
                name="BrowseChannels"
                component={BrowseChannelScreen}
                options={({ navigation }) => ({
                headerRight: () => (
                    <IconButton
                        icon="plus"
                        size={28}
                        color="#ffffff"
                        onPress={() => navigation.navigate('CreateChannel')}
                    />
                ),
                })}
            />
            <ChatStack.Screen 
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                    title: route.params.channel.name,
                })}
            />
        </ChatStack.Navigator>
    )
}