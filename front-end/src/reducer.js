export const initialState = {
    user: null,
    playingSong: null
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
                playingSong: action.song
            };
        default:
            return state;
    }
};

export default reducer;