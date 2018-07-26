import * as React from 'react';
import * as ReactDOM from 'react-dom';

export type ShortUrlResultViewProps = {
	originalUrl: string;
	shortUrl: string;
	isCopied: boolean;
	onCopyUrl: () => void;
};

export const ShortUrlResultView = (props: ShortUrlResultViewProps) => {
	const classNames = `copy-url ${props.isCopied ? 'copied' : ''}`;
	const buttonText = props.isCopied ? 'URL Copied!' : 'Copy URL';

	const originalUrl = props.originalUrl;
	const shortUrl = props.shortUrl;

	return (
		<div className='short-url-result-view'>
			<div className='result-title'>🔗 Here's the short URL!</div>
			<div className='view-section original-url-wrapper'>
				<div>Original: <a className='original-url' href={ originalUrl } target='_blank'>{ originalUrl }</a></div>
			</div>
			<div className='view-section short-url-wrapper'>
				<div>New: <a className='short-url' href={ shortUrl } target='_blank'>{ shortUrl }</a></div>
				<button className={ classNames } onClick={ () => props.onCopyUrl() }>{ buttonText }</button>
			</div>
		</div>
	);
};
