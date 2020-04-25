import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

import 'normalize.css/normalize.css';
import '../css/index.scss';

window.console.nameLog = o => {
	const keys = Object.keys(o);
	for(let i = 0; i < keys.length; i++)
		console.log(keys[i], o[keys[i]])
};


import store from './redux';

ReactDOM["render"](
	<Provider store={ store }>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('app-wrapper')
);