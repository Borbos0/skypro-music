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
    email: string;
    username: string;
    _id: number;
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