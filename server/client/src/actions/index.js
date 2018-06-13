import axios from "axios";

// action types
import { FETCH_USER } from "./types.js";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");
	dispatch({
		type: FETCH_USER,
		payload: res.data
	});
};

// above function before refactoring
// const fetchUser = () => {
// 	return async function(dispatch) {
// 		const res = await axios.get("/api/current_user");
// 		dispatch({
// 			type: FETCH_USER,
// 			payload: res
// 		});
// 	};
// };
