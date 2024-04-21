import {
    EmailErrorEnum,
    EmailErrorType,
    PasswordErrorEnum,
    PasswordErrorType,
    UsernameErrorEnum,
    UsernameErrorType
} from "./types";

export function validatePassword(password: string): PasswordErrorType {
    if (password.length === 0) {
        return PasswordErrorEnum.noPassword
    } else if (password.length < 8) {
        return PasswordErrorEnum.tooSimple
    }
    return null
}


export function validateUsername(username: string): UsernameErrorType {
    if (username.length == 0) {
        return UsernameErrorEnum.noUsername
    } else if (username.length < 3) {
        return UsernameErrorEnum.tooShort
    } if (username.length > 40) {
        return UsernameErrorEnum.tooLong
    }
    return null
}

export function validateEmail(email: string): EmailErrorType {
    const patternValid = email.toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (email.length === 0) {
        return EmailErrorEnum.noEmail
    } else if (!patternValid) {
        return EmailErrorEnum.notValid
    }
    return null
}