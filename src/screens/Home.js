import React, {useContext,useEffect, useState} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Divider, List, Title } from 'react-native-paper';
import { NavigationContainer, useIsFocused } from '@react-navigation/native'

import { kitty } from '../Chatkitty';
import Loading from '../components/Loading';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen({navigation}){
    const { user, logout } = useContext(AuthContext);
    const [channels, setChannels] = useState([]);
    const [loading,setLoading] = useState(true);

    const isFocused = useIsFocused();

    useEffect(()=>{
        let isCancelled = false;

        kitty.getChannels().then((result) => {
            if(!isCancelled) {
                setChannels(result.paginator.items);

                if(loading){
                    setLoading(false);
                }
            }
        });
        return () =>{
            isCancelled = true;
        };
    }, [isFocused, loading]);
    if(loading){
        return <Loading />;
    }
    return(
        <View style={styles.container}>
            {/* <Title>Hello, {user.displayName}!</Title> */}
            <FlatList 
                data={channels}
                keyExtractor={(item)=>item.id.toString()}
                ItemSeparatorComponent={()=> <Divider />}
                renderItem={({item}) => (
                    <List.Item 
                        title={item.name}
                        description={item.type}
                        titleNumberOfLines={1}
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescrion}
                        descriptionNumberOfLines={1}
                        onPress={() => navigation.navigate('Chat', { channel: item })}
                    />
                )}
            />
            <FormButton 
                modeValue="contained"
                title="Logout"
                onPress={()=>logout()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    listTitle: {
        fontSize: 22,
    },
    listDescription: {
        fontSize: 16,
    },
})