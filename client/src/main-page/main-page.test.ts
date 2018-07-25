import {Api} from './../api.srv';
import {UrlHash} from './../common/types/url-hash.type';
import {ApiMock} from './../common/test-utils/api-mock';
import {MainPageFactory} from './main-page.driver';
import * as mocha from 'mocha';
import {expect, assert} from 'chai';

describe('Main page testing', function() {
	it('Should show the url shortener on the page', () => {
		const comp = MainPageFactory.create({});
		expect(comp.isUrlShortenerVisible()).to.eql(true);
	});

	it('Should be able to shorten a url and view the result in the result view', function(done) {
		const comp = MainPageFactory.create({});
		const testUrl = 'http://www.hello-world.com';
		const mockHash = 'abcd';
		const expectedShortUrl = `${Api.BasePath}/${mockHash}`;

		const mockResponse: UrlHash = {
			hash: mockHash
		};

		expect(comp.isShortUrlResultViewVisible()).to.eql(false);
		comp.urlShortener.insertUrl(testUrl);

		ApiMock.mockShortenUrl(mockResponse);
		comp.urlShortener.clickShortenUrl();

		ApiMock.waitForRequest(() => {
			expect(comp.isShortUrlResultViewVisible()).to.eql(true);
			expect(comp.urlResult.getUrl()).to.eql(expectedShortUrl);
		}, done);
	});

	it('Should be able to delete a url and see deletion confirmation', function(done) {
		const comp = MainPageFactory.create({});
		const hash = 'abc';
		const shortUrl = `http://something.com/${hash}`;

		comp.clickEditUrl();
		expect(comp.isUrlEditorVisible()).to.eql(true);
		comp.urlEditor.insertUrl(shortUrl);

		ApiMock.mockDeleteUrl(hash);
		comp.urlEditor.clickDelete();

		ApiMock.waitForRequest(() => {
			expect(comp.isDeleteConfirmationVisible()).to.eql(true);
		}, done);
	});
});
