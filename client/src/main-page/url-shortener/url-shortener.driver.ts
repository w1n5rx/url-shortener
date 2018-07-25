import {UrlShortener} from './url-shortener.comp';
import {BaseDriver} from './../../common/test-utils/base-driver.driver';
import {renderToBody} from './../../common/test-utils/test-utils';
import {UrlShortenerProps} from './url-shortener.comp';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class UrlShortenerFactory {
	static create(props: UrlShortenerProps): UrlShortenerDriver {
		const elem = renderToBody(React.createElement(UrlShortener, props));
		return new UrlShortenerDriver(elem);
	}
}

export class UrlShortenerDriver extends BaseDriver {
	isUrlShortenerVisible(): boolean {
		return this.isChildVisible('.url-shortener');
	}

	isShortenUrlButtonEnabled(): boolean {
		const elem = this.find('.shorten-url-button');
		return elem.hasAttribute('disabled') ? false : true;
	}

	clickShortenUrl() {
		this.clickOn('.shorten-url-button');
	}

	insertUrl(url: string) {
		this.enterValue(url, '.shorten-url-input');
	}
}
