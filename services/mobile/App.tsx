import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
} from 'react-native';

import {
    GoogleSignin,
    statusCodes,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IOS_GOOGLE_CLIENT_ID } from 'react-native-dotenv';
import Helpers from './Helpers/Helpers';

interface GoogleAuthResponseInterface {
    idToken: string,
    scopes?: string[],
    serverAuthCode: any,
    user: {
        email: string,
        familyName: string,
        givenName: string,
        id: string,
        name: string,
        photo: string
    }
}

GoogleSignin.configure({
    iosClientId: IOS_GOOGLE_CLIENT_ID
});

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
    },
    page: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    section: {
        margin: 20,
    }
  });

const App = () => {

    const [logged, setLogged] = useState<boolean>(false);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo: GoogleAuthResponseInterface = await GoogleSignin.signIn();
            await AsyncStorage.setItem('token', userInfo.idToken);
            await AsyncStorage.setItem('email', userInfo.user.email);
            await AsyncStorage.setItem('firstname', userInfo.user.givenName);
            const login = await Helpers.Users.authentificate_users_with_gmail(userInfo.user.email, userInfo.user.givenName, userInfo.user.name);
            if (!login) {
                throw new Error('Err login');
            }
            setLogged(true);
        } catch (error) {
            alert('Error while trying to connect, please try again later');
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    if (!logged){
        return (
            <View style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Welcome to Eventus!</Text>
                </View>
                <View style={styles.section}>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signIn}
                    />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Connected</Text>
                    <Text onPress={() => setLogged(false)}>Logout</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
