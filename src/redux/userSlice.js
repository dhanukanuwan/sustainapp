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

export const saveUserHwi = createAsyncThunk('userdata/saveUserHwi', async ( hwiData ) => {

	const response = await fetch(
		`${Config.API_BASE_URL}/sustainchange/v1/saveuserhvi/?token=${hwiData.token}&hvidata=${JSON.stringify(hwiData.hwi)}`,
		{
			method: "GET",
			headers: {
				Authorization: `Basic ${Config.SUSTAIN_CHANGE_API_KEY}`,
			},
		}
	);

	const userHwiData = await response.json();

	return userHwiData;
});

export const saveUserOvi = createAsyncThunk('userdata/saveUserOvi', async ( hwiData ) => {

	let userRequestData = new FormData();
            userRequestData.append( 'token', hwiData.token );
            userRequestData.append( 'ovidata', JSON.stringify(hwiData.hwi) );

	const response = await fetch(
		`${Config.API_BASE_URL}/sustainchange/v1/saveuserovi/`,
		{
			method: "POST",
			headers: {
				Authorization: `Basic ${Config.SUSTAIN_CHANGE_API_KEY}`,
			},
			body: userRequestData
		}
	);

	const userOwiData = await response.json();

	return userOwiData;
});

export const getHwiMsgs = createAsyncThunk('userdata/getHwiMsgs', async ( hwiData ) => {

	const response = await fetch(
		`${Config.API_BASE_URL}/sustainchange/v1/gethvimsgs/?lang=sv&type=${hwiData.type}&count=${hwiData.count}`,
		{
			method: "GET",
			headers: {
				Authorization: `Basic ${Config.SUSTAIN_CHANGE_API_KEY}`,
			},
		}
	);

	const hwiMessages = await response.json();

	return hwiMessages;
});

export const userDataSlice = createSlice({
	name: 'userdata',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUserData.fulfilled, (state, action) => {
				return action.payload
			})
			.addCase(saveUserHwi.fulfilled, (state, action) => {
				state.data.hvi_data.personal = action.payload.data.all_hvi
			})
			.addCase(getHwiMsgs.fulfilled, (state, action) => {
				state.data.hvi_data.msgs = action.payload.message
			})
			.addCase(saveUserOvi.fulfilled, (state, action) => {
				state.data.ovi_data.personal = action.payload.data.all_ovi
			})
	}
});

export default userDataSlice.reducer;