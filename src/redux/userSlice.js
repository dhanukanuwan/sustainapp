import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Config from "react-native-config";

const initialState = {
	data: {},
	message: '',
	success: false
};

export const fetchUserData = createAsyncThunk('userdata/fetchUserData', async ( jwt ) => {

	let userRequestData = new FormData();
		userRequestData.append("token", jwt);
	
	const response = await fetch(
			`${Config.API_BASE_URL}/sustainchange/v1/getuserbyid/`,
			{
				method: "POST",
				headers: {
					Authorization: `Basic ${Config.SUSTAIN_CHANGE_API_KEY}`,
				},
				body: userRequestData,
			}
	);

	const allUserData = await response.json();

	return allUserData;
});

export const userDataSlice = createSlice({
	name: 'userdata',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
		return action.payload
		})
	}
});

export default userDataSlice.reducer;