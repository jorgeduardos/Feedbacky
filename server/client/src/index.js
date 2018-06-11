import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

//components
import App from "./components/App";
import reducers from "./reducers/";

//first argument to createStore are all the reducers
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
