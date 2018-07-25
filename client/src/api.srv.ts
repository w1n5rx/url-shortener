import * as es6Promise from 'es6-promise';
import {Promise} from 'es6-promise';
import axios from 'axios';
import {UrlHash} from './common/types/url-hash.type';

es6Promise.polyfill();

export class Api {
	static BasePath: string = 'http://localhost:8888';
	static apiUrl: string = `${Api.BasePath}/v1`;

	static shortenUrl(url: string): Promise<UrlHash> {
		return axios.post(`${Api.apiUrl}/links`, { url })	// https://stackoverflow.com/a/51187968/5644090
			.then((res: any) => {
				return res.data as UrlHash;
			});
	}

	static deleteUrl(hash: string): Promise<any> {
		return axios.delete(`${Api.apiUrl}/links/${hash}`);
	}
}
