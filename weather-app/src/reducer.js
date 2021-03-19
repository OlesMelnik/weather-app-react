

export default function reducer(state = [], action) {
    switch (action.type) {
        case "CHANGE_CITY":
            return [
                {
                    city: action.payload.city
                }
            ];

        default:
            return state;
    }
}