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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Helpers from './Helpers/Helpers';
import EventListPage from './pages/Events/List';


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

function SettingsScreen(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={props.logout}>Clique here to logout</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {

    const [logged, setLogged] = useState<boolean>(false);

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

    return (
        <NavigationContainer>
            { logged ? (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={EventListPage} />
                <Tab.Screen name="Settings" children={() => <SettingsScreen logout={() => setLogged(false)} />} />
            </Tab.Navigator>
            ) : (
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
            )}
        </NavigationContainer>
    );
}