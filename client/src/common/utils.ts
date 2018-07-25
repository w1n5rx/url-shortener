import * as isUrl from 'is-url';

export const normalizeUrl = (url: string): string => {
	const urlIsNormalized = url.indexOf('http://') > -1 || url.indexOf('https://') > -1;
	return urlIsNormalized ? url : 'http://' + url;
};

export const isValidUrl = (url: string): boolean => {
	return isUrl(normalizeUrl(url));
};

export const isValidShortUrl = (shortUrl: string): boolean => {
	const normalized = normalizeUrl(shortUrl);
	return isUrl(normalized) && !!(normalized.split('/')[3]);
};

export const getShortUrlHash = (shortUrl: string): string => {
	return shortUrl.split('/')[3];
};
