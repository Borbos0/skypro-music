import { Track } from "@/sharedTypes/sharedTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    currentTrack: null | Track;
    isPlay: boolean;
    isShuffle: boolean;
    playlist: Track[];
    shuffledPlaylist: Track[];
    allTracks: Track[],
    favoriteTracks: Track[],
    fetchError: null | string;
    fetchIsLoading: boolean;
}

const initialState: initialStateType = {
    currentTrack: null,
    isPlay: false,
    isShuffle: false,
    playlist: [],
    shuffledPlaylist: [],
    allTracks: [],
    favoriteTracks: [],
    fetchError: null,
    fetchIsLoading: true,
} 

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<Track>) => {
            state.currentTrack = action.payload
        },
        setCurrentPlaylist: (state, action: PayloadAction<Track[]>) => {
            state.playlist = action.payload
            state.shuffledPlaylist = [...state.playlist].sort(() => Math.random() - 0.5)
        },
        setIsPlay: (state, action: PayloadAction<boolean>) => {
            state.isPlay = action.payload
        },
        toggleShuffle: (state) => {
            state.isShuffle = !state.isShuffle
        },
        setNextTrack: (state) => {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist
            const curIndex = playlist.findIndex((e) => e._id === state.currentTrack?._id)
            const nextIndexTrack = curIndex + 1
            state.currentTrack = playlist[nextIndexTrack]
        },
        setPrevTrack: (state) => {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist
            const curIndex = playlist.findIndex((e) => e._id === state.currentTrack?._id)
            const prevIndexTrack = curIndex - 1
            state.currentTrack = playlist[prevIndexTrack]
        },
        setAllTracks: (state, action: PayloadAction<Track[]>) => {
            state.allTracks = action.payload
        },
        setFavoriteTracks: (state, action: PayloadAction<Track[]>) => {
            state.favoriteTracks = action.payload
        },
        addLikedTracks: (state, action: PayloadAction<Track>) => {
            state.favoriteTracks = [...state.favoriteTracks, action.payload]
        },
        removeLikedTracks: (state, action: PayloadAction<Track>) => {
            state.favoriteTracks = state.favoriteTracks.filter(
                (t) => t._id !== action.payload._id
            );
        },
        setFetchError: (state, action:PayloadAction<string>) => {
            state.fetchError = action.payload
        },
        setFetchIsLoading: (state, action:PayloadAction<boolean>) => {
            state.fetchIsLoading = action.payload
        }
    },
})

export const {setCurrentTrack, setIsPlay, setCurrentPlaylist, setNextTrack, toggleShuffle, setPrevTrack, setAllTracks, setFavoriteTracks, addLikedTracks, removeLikedTracks, setFetchError, setFetchIsLoading} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;