import { ACTION_TYPE } from './type';
const initialState = null;

const selectedreducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_SELECTED_TODO:
            return action.payload;
        default:
            return state;
    }
};

export default selectedreducer;