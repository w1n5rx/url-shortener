import {BaseDriver} from './../../common/test-utils/base-driver.driver';
import {renderToBody} from './../../common/test-utils/test-utils';
import * as React from 'react';
import {ShortUrlEditor, ShortUrlEditorProps} from './short-url-editor.comp';

export class ShortUrlEditorFactory {
	static create(props: ShortUrlEditorProps): ShortUrlEditorDriver {
		const elem = renderToBody(React.createElement(ShortUrlEditor, props));
		return new ShortUrlEditorDriver(elem);
	}
}

export default class ShortUrlEditorDriver extends BaseDriver {
	insertUrl(url: string) {
		this.enterValue(url, '.url-input');
	}

	clickDelete() {
		this.clickOn('.delete-url-button');
	}
}
