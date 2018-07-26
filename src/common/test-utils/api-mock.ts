import {Api} from './../../api.srv';
import {UrlHash} from './../types/url-hash.type';
import axios from 'axios';
import * as AxiosMock from 'axios-mock-adapter';

export class ApiMock {
	private static mock = new AxiosMock(axios);

	static mockShortenUrl(urlHashResponse: UrlHash) {
		this.mock.onPost(`${Api.apiUrl}/links`).reply(200, urlHashResponse);
	}

	static mockDeleteUrl(hash: string) {
		this.mock.onDelete(`${Api.apiUrl}/links/${hash}`).reply(200);
	}

	static waitForRequest(cb: Function, doneFn: Function) {
		setTimeout(() => {
			cb();
			doneFn();
		}, 300);
	}
}
