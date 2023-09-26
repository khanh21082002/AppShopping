//validateEmail
export const isValidationEmail = (stringEmail) => {
    return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(stringEmail)) 
}
     
 
 //validatePassword
export const isValiatePassword = (stringPassword) => stringPassword.length >= 3
    