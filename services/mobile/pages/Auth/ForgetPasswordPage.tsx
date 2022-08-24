import React from 'react';
import {
    View,
    Text,
    TextInput,
    Appearance,
    Platform,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Helpers from '../../Helpers/Helpers';

const ForgetPasswordPage = ({ navigation }) => {

    const scheme = Appearance.getColorScheme();

    const styles = StyleSheet.create({
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          borderColor: scheme === 'dark' && Platform.OS === 'android' ? 'white' : 'lightgrey'
        },
    });

    const [email, setEmail] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [newPasswordRepeat, setNewPasswordRepeat] = React.useState<string>('');
    const [verificationCode, setVerificationCode] = React.useState<string>('');
    const [passwordChangeRequestId, setPasswordChangeRequestId] = React.useState<string>('');
    const [waitingForValidation, setWaitingForValidation] = React.useState<boolean>(false);

    async function generateNewPassword(): Promise<void>{
        if (newPassword !== newPasswordRepeat) {
            alert('Passwords are not identical !');
            return ;
        }
        const new_password_request = await Helpers.PasswordRequests.generate_new_password(email, newPassword);
        if (!new_password_request){
            return ;
        }
        setPasswordChangeRequestId(new_password_request._id);
        setEmail('');
        setNewPassword('');
        setNewPasswordRepeat('');
        setWaitingForValidation(true);
    }

    async function validateNewPassword(){
        const validate_password = await Helpers.PasswordRequests.validate_new_password_change(verificationCode, passwordChangeRequestId);
        if (!validate_password){
            return ;
        }
        setVerificationCode('');
        navigation.navigate('Email Signup');
    }

    return (
        <View>
            { waitingForValidation ? (
                <View>
                    <View>
                        <Text>Enter your verification code (received by email)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setVerificationCode(text)}
                            value={verificationCode}
                        />
                    </View>
                    <TouchableHighlight
                            onPress={validateNewPassword}
                        >
                        <Text>Validate</Text>
                    </TouchableHighlight>
                </View>
            ) : (
                <View>
                    <View>
                        <Text>Your email address</Text>
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
                            onChangeText={(text) => setNewPassword(text)}
                            value={newPassword}
                        />
                    </View>
                    <View>
                        <Text>Verif password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(text) => setNewPasswordRepeat(text)}
                            value={newPasswordRepeat}
                        />
                    </View>
                    <TouchableHighlight
                            onPress={generateNewPassword}
                            style={{
                                alignItems: 'center'
                            }}
                        >
                        <Text>Validate</Text>
                    </TouchableHighlight>
                </View>
            )}
        </View>
    );
};

export default ForgetPasswordPage;