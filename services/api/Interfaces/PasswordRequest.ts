
interface PasswordRequest {
    _id: string,
    user_id: string,
    password: string,
    state: string,
    code: string,
    created_at: string,
}

export default PasswordRequest;