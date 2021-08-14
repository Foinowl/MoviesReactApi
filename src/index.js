import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import reduxThunk from "redux-thunk"
import reducers from "./reducers"

import { ThemeProvider } from 'styled-components';
import theme from './theme';
import GlobalStyle from './globals';

import "../node_modules/react-modal-video/scss/modal-video.scss"

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