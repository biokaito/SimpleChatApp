import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import firebaseSvc from '../../FirebaseSvc';

export default function Chat(navigation)  {

  const [Messages, setMessages] = useState([])
  const [Email, setEmail] = useState('')
  const [Name, setName] = useState('')
  const [Avatar, setAvatar] = useState('')
  const [ID, setID] = useState('')
  const [_ID, set_ID] = useState('')


  const getUser = () => {
    const user = auth().currentUser
    return{
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid
    }
  }

  useEffect(() => {
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    ); 

    firebaseSvc.refOff();
  }, [])

  return (
    <GiftedChat 
      messages={Messages}
      onSend={firebaseSvc.send}
      user={getUser}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
