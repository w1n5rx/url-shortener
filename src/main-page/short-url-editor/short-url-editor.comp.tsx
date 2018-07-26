import {normalizeUrl} from './../../common/utils';
import {getShortUrlHash} from './../../common/utils';
import {isValidShortUrl} from './../../common/utils';
import {Api} from './../../api.srv';
import * as React from 'react';

export type ShortUrlEditorProps = {
	url: string;
	onUrlChange: (newUrl: string) => void;
	deleteDisabled: boolean;
	onDeleteClick: () => void;
};

export const ShortUrlEditor = (props: ShortUrlEditorProps) => {
	return (
		<div className='short-url-editor'>
			<input placeholder='Enter short link' className='input url-input' value={props.url} onChange={(e: any) => props.onUrlChange(e.target.value)} />
			<button className='btn danger delete-url-button' onClick={() => props.onDeleteClick()} disabled={props.deleteDisabled}>Delete URL</button>
		</div>
	);
};

export type ShortUrlEditorContainerProps = {
	onDeleteUrl: () => void;
	onError: () => void;
};

export class ShortUrlEditorContainer extends React.Component<ShortUrlEditorContainerProps, any> {
	state = {
		stagedUrl: ''
	};

	handleDeleteUrl() {
		const shortUrl = this.state.stagedUrl;
		const hash = getShortUrlHash(normalizeUrl(shortUrl));

		Api.deleteUrl(hash).then(() => {
			this.props.onDeleteUrl();
		}, (e) => {
			this.props.onError();
		});
	};

	render() {
		const isDeleteDisabled = !isValidShortUrl(this.state.stagedUrl);
		return <ShortUrlEditor url={this.state.stagedUrl} onUrlChange={(url) => this.setState({stagedUrl: url})} deleteDisabled={isDeleteDisabled} onDeleteClick={() => this.handleDeleteUrl()} />;
	}
}
