import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './global/root.reducer';

const initialState = {};
const enhancers = [];

const middleware = [
	thunk,
];

if (process.env.NODE_ENV === 'development') {
    
    const devToolsExtension = window.devToolsExtension;
    const { createLogger } = require(`redux-logger`);
    
	middleware.push(createLogger({
		collapsed: (getState, action, logEntry) => !logEntry.error,
    }));
    
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers,
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;