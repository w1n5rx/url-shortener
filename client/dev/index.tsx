import {MainPage} from './../src/main-page/main-page.comp';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(<MainPage/>, document.getElementById('app'));

declare var module: any;
module.hot.accept();
