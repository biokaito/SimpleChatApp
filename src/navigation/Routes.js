import { NavigationContainer } from '@react-navigation/native';
import { CurrentUser } from 'chatkitty/build/main/lib/model/current-user';
import React, { useContext, useEffect, useState } from 'react';

import { kitty } from '../Chatkitty';
import Loading from '../components/Loading';

import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function Routes(){
    const {user, setUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitalizing] = useState(true);

    useEffect(()=> {
        return kitty.onCurrentUserChanged((currentUser)=>{
            setUser(currentUser);

            if(initializing){
                setInitalizing(false);

            }
            setLoading(false);
        });
    }, [initializing,setUser]);

    if (loading) {
        return <Loading />;
      }

    return(
        <NavigationContainer>
            {user ? <HomeStack /> : <AuthStack/>}
        </NavigationContainer>
    )
}