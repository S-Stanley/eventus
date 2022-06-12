import React, { useState } from 'react';
import {
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
import { IOS_GOOGLE_CLIENT_ID, ONE_SIGNAL_APP_ID } from 'react-native-dotenv';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OneSignal from 'react-native-onesignal';

import Helpers from './Helpers/Helpers';
import EventListPage from './pages/Events/List';
import EventViewPage from './pages/Events/View';

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(ONE_SIGNAL_APP_ID);

OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log("Prompt response:", response);
});

OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData
    console.log("additionalData: ", data);
    notificationReceivedEvent.complete(notification);
});

OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification);
});

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
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="All events" component={EventListPage} />
            <HomeStack.Screen name="Event details" component={EventViewPage} />
        </HomeStack.Navigator>
    );
  }

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

    async function get_player_id(){
        const deviceState = await OneSignal.getDeviceState();
        return (deviceState?.userId);
    }

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
            if (typeof(login) !== 'boolean'){
                await AsyncStorage.setItem('user_id', login._id);
            }
            await Helpers.Users.add_player_id(userInfo.user.email, await get_player_id() ?? '');
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
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={HomeStackScreen} />
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