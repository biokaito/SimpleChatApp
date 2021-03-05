import React, {useState} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button, ImageEditor, } from 'react-native';
import { set } from 'react-native-reanimated';
import firebaseSvc from '../../FirebaseSvc';

export default function Login({navigation}){

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onPressLogin = async  () => {
        const user = {
            email: Email,
            password: Password,
        };
        firebaseSvc.login(user, loginSuccesss, loginFailed);
    };
    
    const loginSuccesss = () => {
        console.log('login successfull, navigate to chat.');
        navigation.navigate('Chat',{
            name: Name,
            email: Email,
        })
    }
    
    const loginFailed = () => {
        alert('Login failure. Please tried again.');
    };
    
    const onChangeTextEmail = email => setEmail();
    const onChangeTextPassword = password => setPassword();
    return(
        <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="test3@gmail.com"
          onChangeText={(text) => setEmail(text)}
          value={Email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => setPassword(text)}
          value={Password}
        />
        <Button
          title="Login"
          style={styles.buttonText}
          onPress={onPressLogin}
        />

        <Button
          title="Go to create new account"
          style={styles.buttonText}
          onPress={() => navigation.navigate("CreateAccount")}
        />
      </View>
    )    
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 42,
  },
});