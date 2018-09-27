
function stateOfLogin (state = false, action) {
    switch (action.type) {
        case 'LOGIN_IN':
            return action.loginState
        case 'LOGIN_OUT':
            return action.loginState
        default:
            return state;
    }
}
//
// function pageTitle(state = defaultState.pageTitle, action) {
//     // 不同的action有不同的处理逻辑
//     switch (action.type) {
//         case 'SET_PAGE_TITLE':
//             return action.data
//         default:
//             return state
//     }
// }

export default stateOfLogin