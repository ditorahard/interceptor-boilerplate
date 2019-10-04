import redux from 'redux';
import thunk from 'redux-thunk';
import update from 'immutability-helper';
import {createAction, createReducer} from 'redux-act';
import {getPokemon} from './Index.lib';

const [
    testGet
] = [
    'TEST_GET'
].map(createAction);

const indexReducer = {
    [testReduce]: (state, payload) => {
        return update(state, {
            manteb : {
                $set: payload
            }
        })
    }
}

const reducer = createReducer(indexReducer, {})

export default reducer;

export function getTest(){
    return (dispatch, getState) => {
        getPokemon().then((response)=> {
            dispatch(testGet(response));
        })
    }
}