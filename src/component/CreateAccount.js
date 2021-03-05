import { StatusBar } from 'expo-status-bar';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import { ImagePicker } from 'expo-image-picker';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button, ImageEditor  } from 'react-native';
import firebaseSvc from '../../FirebaseSvc'
export default function App() {

    const [Name, setName] = useState('no name');
    const [Email, setEmail] = useState('hihi3@gmail.com');
    const [Password, setPassword] = useState('123456');
    const [Avatar, setAvatar] = useState('');

    onPressCreate = async () => {
      console.log('create account... email:' + Email);
      try {
        const user = {
          name: Name,
          email: Email,
          password: Password,
          avatar: Avatar,
        };
        await firebaseSvc.createAccount(user);
      } catch ({ message }) {
        console.log('create account failed. catch error:' + message);
      }
    };
    onImageUpload = async () => {
      const { status: cameraRollPerm } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      try {
        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
          console.log('choosing image granted...');
          let pickerResult = await ImagePicker.CAMERA_ROLL({
            allowsEditing: true,
            aspect: [4, 3],
          });
          console.log(
            'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
          );
  
          var wantedMaxSize = 150;
          var rawheight = pickerResult.height;
          var rawwidth = pickerResult.width;
          
          var ratio = rawwidth / rawheight;
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize/ratio;
          // check vertical or horizontal
          if(rawheight > rawwidth){
              wantedwidth = wantedMaxSize*ratio;
              wantedheight = wantedMaxSize;
          }
          console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
          let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(pickerResult.uri,
            {
                offset: { x: 0, y: 0 },
                size: { width: pickerResult.width, height: pickerResult.height },
                displaySize: { width: wantedwidth, height: wantedheight },
                resizeMode: 'contain',
            },
            (uri) => resolve(uri),
            () => reject(),
            );
          });
          let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
          //let uploadUrl = await firebaseSvc.uploadImageAsync(resizedUri);
          await setAvatar(uploadUrl);
          console.log(" - await upload successful url:" + uploadUrl);
          console.log(" - await upload successful avatar state:" + Avatar);
          await firebaseSvc.updateAvatar(uploadUrl); //might failed
        }
      } catch (err) {
        console.log('onImageUpload error:' + err.message);
        alert('Upload image error:' + err.message);
      }
    };

  return (
    <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Example@gmail.com"
          onChangeText={(text) => setEmail(text)}
          value={Email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => setPassword(text)}
          value={Password}
        />
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => setName(text)}
          value={Name}
        />
        <Button
          title="Create Account"
          style={styles.buttonText}
          onPress={onPressCreate}
        />
        <Button
          title="Upload Avatar Image"
          style={styles.buttonText}
          onPress={onImageUpload}
        />
      </View>
  );
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
