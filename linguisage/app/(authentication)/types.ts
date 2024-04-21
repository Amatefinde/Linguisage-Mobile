export enum PasswordErrorEnum {
    tooSimple = "Your password is too simple. Use at least 8 symbols",
    invalidCredentials = "Invalid email or password",
    noPassword = "Please enter the password",
}

export type PasswordErrorType = PasswordErrorEnum | null


export enum EmailErrorEnum {
    alreadyExists = "Account with this email already exists",
    notValid = "Entered email is not valid",
    noEmail = "Please enter the email",
    notSupport = "Entered email is not supported"
}

export type EmailErrorType = EmailErrorEnum | null


export enum UsernameErrorEnum {
    noUsername = "Please enter your username",
    tooShort = "Your name is too short. Username should be at least 2 symbols. Feel free to use not your real name.",
    tooLong = "Your name is too long. Username should be at least 2 symbols. Feel free to use not your real name.",
}

export type UsernameErrorType = UsernameErrorEnum | null