import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { combinedReducers } from './reducers';

const middlewares = [ReduxThunk];

const composeEnhancers = composeWithDevTools({
	maxAge: 15,
	shouldRecordChanges: process.env.NODE_ENV !== 'production'
});

if(process.env.NODE_ENV !== 'production') {
	const customLogger = require("redux-logger").createLogger({
		collapsed: true,
		duration : true,
		level: 'warn'
	});

	middlewares.push(customLogger);
}

const store = createStore(combinedReducers, composeEnhancers(
	applyMiddleware(...middlewares)
));

export default store;