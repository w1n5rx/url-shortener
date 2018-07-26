import {Spy} from './../../common/test-utils/test-utils';
import {ShortUrlResultViewFactory} from './short-url-result-view.driver';
import * as mocha from 'mocha';
import {expect, assert} from 'chai';

describe('Short URL result viewer', () => {
	it('It should show the short url string and original url', () => {
		const originalUrl = 'http://www.somethinglong.com/hello?param=world';
		const shortUrl = 'http://www.domain.com/hash';
		const comp = ShortUrlResultViewFactory.create({ originalUrl , shortUrl, isCopied: false, onCopyUrl: Spy.dummy() });
		expect(comp.getUrl()).to.eql(shortUrl);
		expect(comp.getOriginalUrl()).to.eql(originalUrl);
	});

	it('Should call cb when a url is copied', () => {
		const shortUrl = 'http://www.domain.com/hash';
		const spy = new Spy();
		const comp = ShortUrlResultViewFactory.create({ originalUrl: '', shortUrl, isCopied: false, onCopyUrl: spy.fn });
		expect(spy.called()).to.eql(false);
		comp.copyUrl();
		expect(spy.called()).to.eql(true);
	});
});
