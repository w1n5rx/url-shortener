import {Spy} from './../../common/test-utils/test-utils';
import {ShortUrlEditorFactory} from './short-url-editor.driver';
import {expect, assert} from 'chai';

describe('ShortUrlEditor component', function () {
	it('Should call cb when clicking delete url button', () => {
		const spy = new Spy();
		const url = 'http://www.short.com/wdq';
		const comp = ShortUrlEditorFactory.create({ url, onUrlChange: Spy.dummy(), deleteDisabled: false, onDeleteClick: spy.fn });
		expect(spy.called()).to.eql(false);
		comp.clickDelete();
		expect(spy.called()).to.eql(true);
	});
});
