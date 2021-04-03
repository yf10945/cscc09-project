export const initialState = {
    user: null,
    playingSong: null,
    playingSongTitle: null,
    playingSongArtists: null,
    random: false,
    repeat: false,
    playing: false,
    audio: null,
    volume: 0.5
};

const reducer = (state, action) => {
    console.log("Current Context API action is: " + JSON.stringify(action));
    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            };
        case "SET_SONG":
            return {
                ...state,
                playingSong: action.playingSong,
                playingSongTitle: action.playingSongTitle,
                playingSongArtists: action.playingSongArtists,
                playing: true
            };
        case "TOGGLE_RANDOM":
            return {
                ...state,
                random: action.random
            };
        case "TOGGLE_REPEAT":
            return {
                ...state,
                repeat: action.repeat
            };
        case "TOGGLE_PLAY":
            return {
                ...state,
                playing: action.playing
            };
        case "SET_VOLUME":
            return {
                ...state,
                volume: action.volume
            };
        case "SET_SONG_TITLE":
            return {
                ...state,
                playingSongTitle: action.playingSongTitle
            };
        case "SET_SONG_ARTISTS":
            return {
                ...state,
                playingSongArtists: action.playingSongArtists
            };
        default:
            return state;
    }
};

export default reducer;