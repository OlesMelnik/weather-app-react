const cityReducer = (state = "Lviv", action) => {
    switch(action.type){
        case 'CHANGE_CITY':
            return state = action.payload.city;
    }
}

export default cityReducer;