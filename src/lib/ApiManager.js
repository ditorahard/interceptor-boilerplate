import Api from './Api';
import {add, remove} from './../global/global.reducer';
import store from './../store';
import getSafely from './../helpers/Safely';

// const isHandlerEnabled = (config={}) => {
// 	// return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
// 	// 	false : true;
// };

// send the request url to redux store
Api._interceptorRequest = request => {
	console.log('request headers ', request);
	// if (isHandlerEnabled(request)) {
	// Modify request here
	store.dispatch(add(request.url));
	console.log("Store", store);
	// }
	return request;
};


// remove the requset url from redux store
Api._interceptorResponse = (response) => {
	console.log('ini response', response);
	store.dispatch(remove(response.url));
	return response;
};

Api._interceptorResponseError = (err) => {
	console.log('::-- err --::', typeof err.config);
	console.log('::-- err.config.url', err.config.url);

	const url = getSafely(['config', 'url'], err);
	if(url)
		store.dispatch(remove(url));
	if(err.response && err.response.status === 503) {
		// const errorMessageObj = {
		// 	type: 'MAINTENANCE',
		// 	message: 'Silahkan coba beberapa saat lagi.',
		// };
		// dispatch(openErrorModal(errorMessageObj));
		return Promise.reject(err);
	}

	if (err.response && err.response.status >= 500) {
		const errorMessageObj = {
			type: 'SYSTEM_ERROR',
			message: err.response.data && err.response.data.message ? err.response.data.message : 'Silahkan coba beberapa saat lagi',
		};
		// dispatch(openErrorModal(errorMessageObj));
		return Promise.reject(err);
	}

	if(err.response && err.response.status === 401) {
		// clearLocalSession();
	}
	return Promise.reject(err);

};

export default Api;