import {MainPage} from './../src/main-page/main-page.comp';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './style.scss';

ReactDOM.render(<MainPage/>, document.getElementById('app'));

// For hot reloading
declare var module: any;
module.hot.accept();
