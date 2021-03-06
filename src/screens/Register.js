import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';


export default function Register({ navigation }) {

    const [displayName, setDisplayName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    //const [Avatar, setAvatar] = useState('');    

    const { register, loading } = useContext(AuthContext);
    if(loading){
      return <Loading />;
    }

  return (
    <View style={styles.container}>
        <Title style={styles.titleText}>Register</Title>
        <FormInput 
          labelName="Display Name"
          value={displayName}
          autoCapitalize="none"
          onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
        />
        <FormInput 
          labelName="Email"
          value={Email}
          autoCapitalize="none"
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <FormInput
            labelName="Password"
            value={Password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <FormButton
            title="Signup"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
              register(displayName, Email, Password)
            }}
        />
        <IconButton
            icon="keyboard-backspace"
            size={30}
            style={styles.navButton}
            color="#5b3a70"
            onPress={() => navigation.goBack()}
        />
    </View>
  );
}

const offset = 16;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});
