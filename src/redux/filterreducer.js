import { ACTION_TYPE } from './type';

const filterreducer = (state = 'all', action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_FILTER:
            return action.payload;
        default:
            return state;
    }
};

export default filterreducer;
