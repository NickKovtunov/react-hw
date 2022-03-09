const initialState = {
    login: "NewNadym",
    repo: "NewNadym.github.io",
    blackList: "NewNadym",
    reviewer: null,
    contributors: null,
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case 'ChangeLogin':
            return {
                ...state, login: action.payload
            }
        case 'ChangeRepo':
            return {
                ...state, repo: action.payload
            }
        case 'ChangeBlackList':
            return {
                ...state, blackList: action.payload
            }
        case 'ChangeReviewer':
            return {
                ...state, reviewer: action.payload
            }
        case 'ChangeContributors':
            return {
                ...state, contributors: action.payload
            }
        default:
            return state
    }
}