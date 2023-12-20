const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LANG':
            return {
                ...state,
                lang: action.payload
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

export default Reducer;