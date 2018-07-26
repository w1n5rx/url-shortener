import {ShortUrlResultView} from './short-url-result-view.comp';
import {ShortUrlResultViewProps} from './short-url-result-view.comp';
import {BaseDriver} from './../../common/test-utils/base-driver.driver';
import {renderToBody} from './../../common/test-utils/test-utils';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class ShortUrlResultViewFactory {
	static create(props: ShortUrlResultViewProps): ShortUrlResultViewDriver {
		const elem = renderToBody(React.createElement(ShortUrlResultView, props));
		return new ShortUrlResultViewDriver(elem);
	}
}

export class ShortUrlResultViewDriver extends BaseDriver {
	getUrl(): string {
		return this.getText('.short-url');
	}

	getOriginalUrl(): string {
		return this.getText('.original-url');
	}

	copyUrl() {
		this.clickOn('.copy-url');
	}
}
