import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Helpers from '../../Helpers/Helpers';

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

const EmailAuthPage = ({ navigation, connected_successfully }) => {

    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const login_or_signup = async() => {
        const req = await Helpers.Users.login_or_signup_user(email, pass);
        if (req) {
            connected_successfully(email);
            setEmail('');
            setPass('');
        }
    }

    return (
        <View>
            <View>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setPass(text)}
                    value={pass}
                />
            </View>
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                <TouchableHighlight
                    onPress={login_or_signup}
                >
                    <Text>Validate</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default EmailAuthPage;