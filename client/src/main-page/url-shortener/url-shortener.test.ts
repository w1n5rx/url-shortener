import {Spy} from './../../common/test-utils/test-utils';
import {UrlShortenerFactory} from './url-shortener.driver';
import * as mocha from 'mocha';
import {expect, assert} from 'chai';

describe('URL Shortener component', function() {
	it('Shorten URL button should be disabled when the URL is invalid', () => {
		const comp = UrlShortenerFactory.create({ onClickShortenLink: Spy.dummy() });
		expect(comp.isShortenUrlButtonEnabled()).to.eql(false);
		comp.insertUrl('invalidgibrish');
		expect(comp.isShortenUrlButtonEnabled()).to.eql(false);
	});

	it('Shorten URL button should be enabled for valid URL and trigger callback on click', () => {
		const spy = new Spy();
		const testUrl = 'http://www.google.com';
		const comp = UrlShortenerFactory.create({ onClickShortenLink: spy.fn });

		comp.insertUrl(testUrl);
		expect(comp.isShortenUrlButtonEnabled()).to.eql(true);
		expect(spy.called()).to.eql(false);
		comp.clickShortenUrl();
		expect(spy.called()).to.eql(true);
		expect(spy.getLastCallArgs()).to.eql([testUrl]);
	});

	it('Shorten URL button should be enabled for urls without http and call cb with it', () => {
		const testUrl = 'www.hello.com';
		const expectedUrl = 'http://www.hello.com';

		const spy = new Spy();
		const comp = UrlShortenerFactory.create({ onClickShortenLink: spy.fn });
		comp.insertUrl(testUrl);
		expect(comp.isShortenUrlButtonEnabled()).to.eql(true);
		comp.clickShortenUrl();
		expect(spy.getLastCallArgs()).to.eql([expectedUrl]);
	});
});
