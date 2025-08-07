import axios from "axios"
import { BASE_URL } from "../constants"
import { Selection, Track } from "@/sharedTypes/sharedTypes"

export const getTracks = (): Promise<Track[]> => {
    return axios(BASE_URL + '/catalog/track/all').then((res) => {
        return res.data.data
    })
}

export const getSelectionById = (id: string): Promise<Selection> => {
    return axios.get(BASE_URL + `/catalog/selection/${id}/`).then((res) => {
        return res.data.data
    })
}