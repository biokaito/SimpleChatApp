import React, { useContext, useEffect, useState } from 'react';
import { Bubble, GiftedChat, Avatar, Actions, ActionsProps } from 'react-native-gifted-chat';
import { StyleSheet, View,Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { kitty } from '../Chatkitty';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function ChatScreen({ route, navigation, showNotification }) {
  const { user } = useContext(AuthContext);
  const { channel } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    getPermissionAsync();
    const startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) =>
            GiftedChat.append(currentMessages, [mapMessage(message)])
        );
      },
      onTypingStarted: (typingUser) => {
        if(typingUser.id !== user.id){
          setTyping(typingUser);
        }
      },
      onTypingStopped: (typingUser) => {
        if(typingUser.id == user.id){
          setTyping(null);
        }
      },
      onParticipantEnteredChat: (participant) => {
        showNotification({
          title: `${participant.displayName} entered this chat`
        });
      },
      onParticipantLeftChat: (participant) => {
        showNotification({
          title: `${participant.displayName} left this chat`,
        })
      }
    });

    kitty
    .getMessages({
      channel: channel,
    })
    .then((result) => {
      setMessages(result.paginator.items.map(mapMessage));

      setMessagePaginator(result.paginator);
      setLoadEarlier(result.paginator.hasNextPage);

      setLoading(false);
    });

    return startChatSessionResult.session.end;
  }, [user, channel]);

  async function handleSend(pendingMessages) {
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
    });
  }

  async function handleLoadEarlier() {
    if (!messagePaginator.hasNextPage) {
      setLoadEarlier(false);

      return;
    }

    setIsLoadingEarlier(true);

    const nextPaginator = await messagePaginator.nextPage();

    setMessagePaginator(nextPaginator);

    setMessages((currentMessages) =>
        GiftedChat.prepend(currentMessages, nextPaginator.items.map(mapMessage))
    );

    setIsLoadingEarlier(false);
  }

  function renderBubble(props) {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#d3d3d3',
              },
            }}
        />
    );
  }

  if (loading) {
    return <Loading />;
  }

  function renderAvatar(props){
    return(
      <Avatar 
        {...props}
        onPressAvatar={(avatarUser) =>{
          kitty
          .createChannel({
            type: 'DIRECT',
            members: [{ id: avatarUser._id }],
          })
          .then ((result) => {
            navigation.navigate('Chat', { channel: result.channel});
          });
        }}
      />
    )
  }
  
  function mapMessage(message) {
    return {
      _id: message.id,
      text: message.body,
      createdAt: new Date(message.createdTime),
      user: mapUser(message.user),
    };
  }
  
  function mapUser(user) {
    return {
      _id: user.id,
      name: user.displayName,
      avatar: user.displayPictureUrl,
    };
  }

  async function handleInputTextChanged(text){
    await kitty.sendKeystrokes({
      channel: channel,
      keys: text,
    })
  }

  function renderFooter() {
    if (typing) {
      return (
        <View style={styles.footer}>
          <Text style={styles.textFooter}>{typing.displayName} is typing...</Text>
        </View>
      );
    }

    return null;
  }

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Permission for camera access required.");
      }
      const { statusCam } = await Permissions.askAsync(Permissions.CAMERA);
      if (statusCam !== "granted") {
        alert("Permission for camera access required.");
      }
    }
  }

  async function handlerSelectImage() {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // on Android user can rotate and crop the selected image; iOS users can only crop
        quality: 1, // Chất lượng ảnh cao nhất
        aspect: [4, 3], // duy trì tỷ lệ chuẩn
        //base64: true
      });
      //console.log(response.uri)
    } catch (error) {
      setError(error);
    }
  }  

  function renderActions(props: Readonly<ActionsProps>){
    return(
      <Actions 
        {...props}
        options={{
          ['Send Image']: handlerSelectImage,
        }}
        icon={() => (
          // <IconButton name={'camera'} size={28} color="black" />
          //<Text>Pick image</Text>
          <Entypo name="attachment" size={24} color="black" />
        )}
        onSend={args => console.log(args)}
      />
    )
  }

  return (
      <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={mapUser(user)}
          loadEarlier={loadEarlier}
          isLoadingEarlier={isLoadingEarlier}
          onLoadEarlier={handleLoadEarlier}
          renderBubble={renderBubble}
          renderAvatar={renderAvatar}
          onInputTextChanged={handleInputTextChanged}
          isTyping={typing != null}
          renderFooter={renderFooter}

          renderActions={renderActions}
      />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,    
  },
  textFooter:{
    fontStyle: 'italic'
  }
});