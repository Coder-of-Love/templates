import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'react-router-dom';

import PageHome from './_pages/Home';


function App() {
	return (
		<div id='app'>
			<div cl-wrapper='page'>
				<Switch>
					<Route exact path='/' component={ PageHome }/>
					<Route path='*' render={ () => <Redirect to='/'/> }/>
				</Switch>
			</div>
		</div>
	)
}

export default process.env.NODE_ENV === 'production' ?
	App :
	hot(module)(App);