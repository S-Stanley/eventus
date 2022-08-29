import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Appearance,
    Platform,
} from 'react-native';

import {
    GoogleSignin,
    statusCodes,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IOS_GOOGLE_CLIENT_ID, ONE_SIGNAL_APP_ID, WEB_CLIENT_ID } from 'react-native-dotenv';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OneSignal from 'react-native-onesignal';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

import Helpers from './Helpers/Helpers';
import EventListPage from './pages/Events/List';
import EventViewPage from './pages/Events/View';
import EmailAuthPage from './pages/Auth/EmailAuthPage';
import ForgetPasswordPage from './pages/Auth/ForgetPasswordPage';

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
    iosClientId: IOS_GOOGLE_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
});

function SettingsScreen(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={props.logout}>Clique here to logout</Text>
        </View>
    );
}

function WelcomeScreen({ signInWithGoogle, navigation, signInWithApple }) {
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

    const onAppleButtonPress = async(): Promise<void> => {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        if (credentialState === appleAuth.State.AUTHORIZED) {
            signInWithApple(appleAuthRequestResponse);
        } else {
            alert('Error while tyring to login with Apple')
        }
    }

    return (
        <View style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Welcome to Eventus!</Text>
                <Text
                    style={{
                        textAlign: 'center'
                    }}>
                        v1.6.3 (beta)
                </Text>
            </View>
            <View style={styles.section}>
                { Platform.OS !== 'android' &&
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signInWithGoogle}
                    />
                }
            </View>
            <View>
                { Platform.OS !== 'android' &&
                    <AppleButton
                        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{
                            width: 186,
                            height: 45,
                        }}
                        onPress={() => onAppleButtonPress()}
                    />
                }
            </View>
            <View style={styles.section}>
                <TouchableHighlight
                    style={{
                        backgroundColor: '#808080',
                        width: 180,
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}
                    onPress={() => navigation.navigate('Email Signup')}
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center'
                        }}
                    >Sign in with email</Text>
                </TouchableHighlight>
            </View>
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

function UnloggedScreen({ signInWithGoogle, connected_successfully, signInWithApple }) {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen options={{headerShown: false}} name="Welcome" children={(navigation) => <WelcomeScreen signInWithGoogle={signInWithGoogle} navigation={navigation.navigation} signInWithApple={signInWithApple} />} />
            <HomeStack.Screen name="Email Signup" children={(navigation) => <EmailAuthPage navigation={navigation.navigation} connected_successfully={connected_successfully} />} />
            <HomeStack.Screen name="New password request" children={(navigation) => <ForgetPasswordPage navigation={navigation.navigation} />} />
        </HomeStack.Navigator>
    );
}

export default function App() {

    const [logged, setLogged] = useState<boolean>(false);

    async function get_player_id(){
        const deviceState = await OneSignal.getDeviceState();
        return (deviceState?.userId);
    }

    const connected_successfully = async(email: string) => {
        await Helpers.Users.add_player_id(email, await get_player_id() ?? '');
        setLogged(true);
    }

    const connected_successfull_with_apple = async(apple_user_id: string) => {
        await Helpers.Users.add_player_id_with_apple(apple_user_id, await get_player_id() ?? '');
        setLogged(true);
    }

    const signInWithGoogle = async () => {
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
            connected_successfully(userInfo.user.email);
        } catch (error) {
            alert('Error while trying to connect, please try again later');
            alert(JSON.stringify(error));
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

    const signInWithApple = async (appleCredentials: { user: string, email: string }): Promise<void> => {
        try {
            const login = await Helpers.Users.authentificate_users_with_apple(appleCredentials.user, appleCredentials.email ?? '');
            await AsyncStorage.setItem('email', appleCredentials.email ?? '');
            if (!login) {
                throw new Error('Err login');
            }
            if (typeof(login) !== 'boolean'){
                await AsyncStorage.setItem('user_id', login._id);
            }
            connected_successfull_with_apple(appleCredentials.user);
        } catch (error) {
            alert('Error while trying to connect, please try again later');
            alert(JSON.stringify(error));
        }
    };

    const scheme = Appearance.getColorScheme();

    return (
        <NavigationContainer theme={scheme === 'dark' && Platform.OS === 'android' ? DarkTheme : DefaultTheme}>
            { logged ? (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={HomeStackScreen} />
                <Tab.Screen name="Settings" children={() => <SettingsScreen logout={() => setLogged(false)} />} />
            </Tab.Navigator>
            ) : (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" children={() => <UnloggedScreen
                    signInWithGoogle={signInWithGoogle}
                    connected_successfully={connected_successfully}
                    signInWithApple={signInWithApple}
                />} />
            </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}