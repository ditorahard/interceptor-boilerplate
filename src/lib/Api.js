import axios, { CancelToken } from 'axios';
import getSafely from '../helpers/Safely';

const BASE_URL = 'https://pokeapi.co/api/v2/';

/**
 * Enhancer Interceptor Request 
 * @param {*} fn 
 */
export function interceptorRequest (fn, fnError = () => Promise.reject()) {
	axios.interceptors.request.use(fn, fnError);
}

/**
 * Enhancer Interceptor Response 
 * @param {*} fn 
 */
export function interceptorResponse (fn, fnError = () => Promise.reject()) {
	axios.interceptors.response.use(fn, fnError);
}

class API {

    constructor(url = BASE_URL){
      this._url = url;
			this._seekCredential = async () => {};
			this._interceptorRequest = config => config;
			this._interceptorRequestError = err => Promise.reject(err);
			this._interceptorResponse = response => response;
			this._interceptorResponseError = err => Promise.reject(err);
    }

    async call (obj, errHandling = false) {
		
		console.log('::-- call', obj);

		let cancel;
		let ac = await this._seekCredential();

		const options = getSafely(['options'], obj);

		if(!getSafely(['headers'], options)) 
			options['headers'] = {};

		if(!getSafely(['headers', 'content-type'], options))
			options['headers']['content-type'] = 'application/json';


		if (ac) ac = 'Bearer ' + ac;
		if (ac) options.headers['Authorization'] = ac;
		
		const config = {
			url: obj.url,
			// timeout: TIMEOUT,
			headers: options.headers,
			data: JSON.stringify(obj.data || {}),
			method: options.method || 'get',
			params: obj.params,
			responseType: 'json',
			cancelToken: new CancelToken(function (c) {
				cancel = c;
			})
		};

		const instance = axios.create();
				instance.interceptors.request.use(this._interceptorRequest, this._interceptorRequestError);
        instance.interceptors.response.use(this._interceptorResponse, this._interceptorResponseError);
        
        return instance.request(config);
        
		}
		
		_get() {
			return URL;
		}
		
		setInterceptorRequest (fn, fnE) {
			if(fn) this._interceptorRequest = fn;
			if(fnE) this._interceptorRequestError = fnE;
		}

		setInterceptorResponse (fn, fnE) {
			if(fn) this._interceptorResponse = fn;
			if(fnE) this._interceptorResponseError = fnE;
		}
    
    async get(endpoint, queryparam = {}) {

		let url = this._url + endpoint;

		let options = {
			method: 'GET',
		};

		return await this.call({
			url, 
			params: {
				...queryparam	
			},
			options,
		});

    }
    
    async post(endpoint, bodyparam) {

		let url = this._url + endpoint;

		let options = {
			method: 'POST',
		};

		return await this.call({
			url, 
			data: {
				...bodyparam	
			},
			options,
		});
	}

    // get(endpoint){
    //     return axios
    //             .get(this._url + endpoint)
    //             .then((response) => {
    //                 console.log("response API get", response);
    //                 return response;
    //             })
    // }

    // post(endpoint, input){
    //     return axios
    //             .post(this._url + endpoint, input)
    //             .then((response) => {
    //                 console.log("response API post", response);
    //                 return response;
    //             })
    // }
}

const request = new API(); //Singleton pattern
export default request;