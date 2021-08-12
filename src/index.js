import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import reduxThunk from "redux-thunk"

import { ThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyle from './globals';


import App from './containers/App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Fragment>
				<Provider store={store}>
					<App />
				</Provider>
				
				<GlobalStyle />
			</Fragment>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
