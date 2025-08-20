import axios from "axios"
import { BASE_URL } from "../constants"

interface authUserProps {
    email: string;
    password: string;
}

interface regUserProps extends authUserProps {
    username: string;
}

type authUserReturn = {
    data: {
        email: string,
        username: string,
        _id: number
    } 
}

type regUserReturn = {
    message: string,
    result: {
        username: string,
        email: string,
        _id: number
    },
    success: boolean
}

type accessTokenType = {
    access: string
}

type refreshTokenType = {
    refresh: string
}

type tokensType = accessTokenType & refreshTokenType;

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
    return axios.post(BASE_URL + '/user/login',
        data,
        {headers: {
        'content-type': 'application/json',
    },
},
)}

export const regUser = (data: regUserProps): Promise<regUserReturn> => {
    return axios.post(BASE_URL + '/user/signup',
        data,
        {headers: {
        'content-type': 'application/json',
    },
},
)}

export const getTokens = (data: authUserProps): Promise<tokensType> => {
    return axios.post(BASE_URL + '/user/token', data).then((res) => res.data)
}

export const refreshTokens = (refresh: string): Promise<accessTokenType> => {
    return axios.post(BASE_URL + '/user/token/refresh', {refresh}).then((res) => res.data)
}