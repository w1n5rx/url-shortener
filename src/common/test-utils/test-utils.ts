import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Promise} from 'es6-promise';

export const renderToBody = (component: any) => {
	const elem = document.createElement('div');
	document.body.innerHTML = '';
	ReactDom.render(component, elem);
	document.body.appendChild(elem);
	return elem;
};

export class Spy {
	calls = 0;
	callArgs: any[] = [];
	stub: any;

	constructor(stub: () => any = () => null) {
		this.calls = 0;
		this.callArgs = [];
		this.stub = stub;
	}

	fn = (...args: any[]) => {
		const val = this.stub(...args);
		this.calls++;
		this.callArgs.push(args);

		return val || new Promise((r: any, s: any) => r());
	}

	static dummy() {
		return new Spy().fn;
	}

	called(): boolean {
		return this.calls > 0;
	}

	getLastCallArgs(): any {
		return this.callArgs[this.callArgs.length - 1];
	}
}
