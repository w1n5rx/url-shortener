import ShortUrlEditorDriver from './short-url-editor/short-url-editor.driver';
import {ShortUrlResultViewDriver} from './short-url-result-view/short-url-result-view.driver';
import {UrlShortenerDriver} from './url-shortener/url-shortener.driver';
import {MainPageProps} from './main-page.comp';
import {MainPage} from './main-page.comp';
import {BaseDriver} from './../common/test-utils/base-driver.driver';
import {renderToBody} from './../common/test-utils/test-utils';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class MainPageFactory {
	static create(props: MainPageProps): MainPageDriver {
		const elem = renderToBody(React.createElement(MainPage, props));
		return new MainPageDriver(elem);
	}
}

export class MainPageDriver extends BaseDriver {
	get urlShortener(): UrlShortenerDriver {
		const elem = this.find('.url-shortener');
		return new UrlShortenerDriver(elem);
	}

	get urlResult(): ShortUrlResultViewDriver {
		const elem = this.find('.short-url-result-view');
		return new ShortUrlResultViewDriver(elem);
	}

	get urlEditor(): ShortUrlEditorDriver {
		const elem = this.find('.short-url-editor');
		return new ShortUrlEditorDriver(elem);
	}

	clickEditUrl() {
		this.clickOn('.edit-url');
	}

	isUrlShortenerVisible(): boolean {
		return this.urlShortener.isVisible();
	}

	isShortUrlResultViewVisible(): boolean {
		return this.urlResult.isVisible();
	}

	isUrlEditorVisible(): boolean {
		return this.urlEditor.isVisible();
	}

	isDeleteConfirmationVisible(): boolean {
		return this.isChildVisible('.url-delete-message');
	}
}
