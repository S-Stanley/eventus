import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Config from "../Config/Config";
import PasswordRequest from '../interfaces/PasswordRequest';

async function generate_new_password(email: string, password: string): Promise<PasswordRequest | null>{
    try {
        const req = await axios.post(`${Config.Api.url}/users/password/new/generate`, {
            password: password,
            email: email,
        });
        return (req.data);
    } catch(e) {
        console.error(JSON.stringify(e));
        alert("There was an error, please try again later");
        return (null);
    }
}

async function validate_new_password_change(code: string, request_id: string): Promise<PasswordRequest | null>{
    try {
        const req = await axios.post(`${Config.Api.url}/users/password/new/validate`, {
            request_id: request_id,
            code: code,
        });
        return (req.data);
    } catch(e) {
        console.error(e);
        alert("There was an error, please try again later");
        return (null);
    }
}

export default {
    generate_new_password,
    validate_new_password_change
}