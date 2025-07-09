import User from "../src/usuario/usuario.model.js"
import { isValidObjectId } from "mongoose"
import { parsePhoneNumberFromString, isValidPhoneNumber } from "libphonenumber-js"

export const existEmail = async(email, user)=> {
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existUserName = async(username, user)=> {
    const alreadyUserName = await User.findOne({username})
    if(alreadyUserName && alreadyUserName._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

//Otras validaciones para la bd
export const objectIdValid = async(objectid)=>{
    if(!isValidObjectId(objectid)) throw new Error(`Is not valid ObjectId`)
}

export const comonPasswords = async(password)=> {
    const comonPasswords = ['Password1234', 'Test1234', 'Prueba1234', 'Hola1234', 'Client1234', 'Admin1234', '12345678', 'asdfghjk', 'testtest', '1234Aa', '123456789', '12345678', '1234567', '1234567890', '123456', '123456789a', '123456789b', '123456789c', '123456789d', '123456789e', '123456789f', '123456789g', '123456789h', '123456789i', '123456789j', '123456789k', '123456789l', '123456789m', '123456789n', '123456789o', '123456789p', '123456789q', '123456789r', '123456789s', '123456789t',
    '4DMIN1234', 'qwertyuiop', 'QWERTYUIOP', 'asdfghjkl', 'ASDFGHJKL', 'zxcvbnm', 'ZXCVBNM', '1234567890qwertyuiop', '1234567890asdfghjkl', '1234567890zxcvbnm', '1234567890QWERTYUIOP', '1234567890ASDFGHJKL', '1234567890ZXCVBNM', '1234567890qwerty', '1234567890asdfghj', '1234567890zxcvbn', '1234567890QWERTY', '1234567890ASDFGH', '1234567890ZXCVBN', '1234567890qwertyui', '1234567890asdfghjk', '1234567890zxcvbnm', '1234567890QWERTYUI', '1234567890ASDFGHJK', '1234567890ZXCVBNM', '1234567890qwertyuiopasdfghjkl', '1234567890qwertyuiopzxcvbnm', '1234567890QWERTYUIOPASDFGHJKL', '1234567890ZXCVBNMqwertyuiop', '1234567890ZXCVBNMasdfghjkl', '1234567890ZXCVBNMzxcvbnm'
    ]
    if(comonPasswords.includes(password)){
        throw new Error('Password is too common')
    }
    return true
}

export const validatePhoneNumberForDB = (phoneNumber, countryCode) => {
    if (!phoneNumber) {
        console.error('El número de teléfono es requerido.');
        throw new Error('El número de teléfono es requerido.');
    }

    if (typeof phoneNumber !== 'string') {
        console.error('El número de teléfono debe ser una cadena.');
        throw new Error('El número de teléfono debe ser una cadena.');
    }

    if (!countryCode) {
        console.error('El código de país es requerido para la validación.');
        throw new Error('El código de país es requerido para la validación.');
    }

    const parsedNumber = parsePhoneNumberFromString(phoneNumber, countryCode.toUpperCase());

    if (!parsedNumber) {
        console.error('El número de teléfono no pudo ser parseado.');
        throw new Error('El número de teléfono no pudo ser parseado.');
    }

    if (!isValidPhoneNumber(parsedNumber.number)) {
        console.error(`El número de teléfono ${phoneNumber} no es válido para el país ${countryCode.toUpperCase()}.`);
        throw new Error(`El número de teléfono ${phoneNumber} no es válido para el país ${countryCode.toUpperCase()}.`);
    }
    const normalizedNumber = parsedNumber.format('E.164');
    return { isValid: true, normalizedNumber };
}