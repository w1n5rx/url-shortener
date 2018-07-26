import {ShortUrlEditorContainer} from './short-url-editor/short-url-editor.comp';
import {ShortUrlEditor} from './short-url-editor/short-url-editor.comp';
import {ShortUrlResultView} from './short-url-result-view/short-url-result-view.comp';
import {UrlShortenerContainer} from './url-shortener/url-shortener.comp';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as copy from 'copy-to-clipboard';

export type MainPageProps = {
	// No props here
};

export class MainPage extends React.Component<MainPageProps, any> {
	state = {
		shortUrl: '',
		originalUrl: '',
		userCopiedUrl: false,
		isEditOpen: false,
		isDeleteMessageVisible: false,
		isDeleteOk: true
	};

	handleNewShortUrl(shortUrl: string, originalUrl: string) {
		this.setState({shortUrl, originalUrl, userCopiedUrl: false });
	}

	handleCopyUrl() {
		copy(this.state.shortUrl);
		this.setState({userCopiedUrl: true});
	}

	handleUrlDeleted() {
		this.setState({ isDeleteOk: true, isDeleteMessageVisible: true });
	}

	handleUrlDeleteError() {
		this.setState({ isDeleteOk: false, isDeleteMessageVisible: true });
	}

	render() {
		const shortUrlResult =
		<ShortUrlResultView
				originalUrl={ this.state.originalUrl }
				shortUrl={ this.state.shortUrl }
				isCopied={ this.state.userCopiedUrl }
				onCopyUrl={ () => this.handleCopyUrl() }/>;

		const deleteMessage = this.state.isDeleteOk ? '✔ URL has been deleted!' : '✗ Could not delete this URL.';
		const isEditOpen = this.state.isEditOpen;
		const editorWrapper = (
			<div className='editor-wrapper'>
				{ isEditOpen ? <ShortUrlEditorContainer onDeleteUrl={() => this.handleUrlDeleted()} onError={() => this.handleUrlDeleteError()}/> : null }
				{ !isEditOpen ? <a className='edit-url' onClick={ () => this.setState({isEditOpen: true}) }>Delete a short URL</a> : null }
				{ this.state.isDeleteMessageVisible ? <div className={`url-delete-message ${this.state.isDeleteOk ? 'deleted' : ''}`}>{ deleteMessage }</div> : null }
			</div>
		);

		return (
			<div className='main-page'>
				<div className='shortener-wrapper'>
					<div className='shortener-titles'>
						<h2 className='heading'>URL Shortener</h2>
					</div>
					<UrlShortenerContainer onShortUrlCreated={ (shortUrl, originalUrl) => this.handleNewShortUrl(shortUrl, originalUrl) } />
					{ this.state.shortUrl ? shortUrlResult : null }
					{ editorWrapper }
				</div>
			</div>
		);
	}
}
