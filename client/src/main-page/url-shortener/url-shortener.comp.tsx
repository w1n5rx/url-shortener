import {normalizeUrl} from './../../common/utils';
import {isValidUrl} from './../../common/utils';
import {Api} from './../../api.srv';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export type UrlShortenerProps = {
	onClickShortenLink: (url: string) => void;
};

export class UrlShortener extends React.Component<UrlShortenerProps, any> {
	state = {
		stagedUrl: ''
	};

	handleShortenLink(event: any) {
		event.preventDefault();
		const stagedUrl = this.state.stagedUrl;
		this.props.onClickShortenLink(normalizeUrl(stagedUrl));
	}

	render() {
		const stagedUrl = this.state.stagedUrl;
		const props = this.props;

		const isStagedUrlValid = isValidUrl(stagedUrl);

		return (
			<div className='url-shortener'>
				<form className='form' onSubmit={(event: any) => this.handleShortenLink(event)}>
					<input className='input shorten-url-input' placeholder='Enter your link' value={stagedUrl} onChange={(e: any) => this.setState({stagedUrl: e.target.value})} />
					<button type='submit' className='btn shorten-url-button' disabled={!isStagedUrlValid}>Shorten</button>
				</form>
			</div>
		);
	}
}

export type UrlShortenerContainerProps = {
	onShortUrlCreated: (shortUrl: string, originalUrl: string) => void;
};

export class UrlShortenerContainer extends React.Component<UrlShortenerContainerProps, any> {
	shortenUrl(url: string) {
		Api.shortenUrl(url).then((urlHash) => {
			const shortUrl = `${Api.BasePath}/${urlHash.hash}`;
			this.props.onShortUrlCreated(shortUrl, url);
		});
	}

	render() {
		return <UrlShortener onClickShortenLink={(url) => this.shortenUrl(url)} />;
	}
}
