import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {API_BASE_URL, SUSTAIN_CHANGE_API_KEY} from "@env"

const initialState = {
	data: {},
	resetpass: {},
	message: '',
	success: false
};

export const fetchUserData = createAsyncThunk('userdata/fetchUserData', async ( jwt ) => {

	let userRequestData = new FormData();
		userRequestData.append("token", jwt);
	
	const response = await fetch(
			`${API_BASE_URL}/sustainchange/v1/getuserbyid/`,
			{
				method: "POST",
				headers: {
					Authorization: `Basic ${SUSTAIN_CHANGE_API_KEY}`,
				},
				body: userRequestData,
			}
	);

	const allUserData = await response.json();

	return allUserData;
});

export const fetchHwiQuestions = createAsyncThunk('userdata/fetchHwiQuestions', async ( qfield ) => {
	
	const response = await fetch(
			`${API_BASE_URL}/sustainchange/v1/getanyindexquestions/?field=${qfield}`,
			{
				method: "GET",
				headers: {
					Authorization: `Basic ${SUSTAIN_CHANGE_API_KEY}`,
				}
			}
	);

	const hwiQuestions = await response.json();

	return hwiQuestions;
});

export const saveUserHwi = createAsyncThunk('userdata/saveUserHwi', async ( hwiData ) => {

	const response = await fetch(
		`${API_BASE_URL}/sustainchange/v1/saveuserhvi/?token=${hwiData.token}&hvidata=${JSON.stringify(hwiData.hwi)}`,
		{
			method: "GET",
			headers: {
				Authorization: `Basic ${SUSTAIN_CHANGE_API_KEY}`,
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
		`${API_BASE_URL}/sustainchange/v1/saveuserovi/`,
		{
			method: "POST",
			headers: {
				Authorization: `Basic ${SUSTAIN_CHANGE_API_KEY}`,
			},
			body: userRequestData
		}
	);

	const userOwiData = await response.json();

	return userOwiData;
});

export const getHwiMsgs = createAsyncThunk('userdata/getHwiMsgs', async ( hwiData ) => {

	const response = await fetch(
		`${API_BASE_URL}/sustainchange/v1/gethvimsgs/?lang=${hwiData.lng}&type=${hwiData.type}&count=${hwiData.count}`,
		{
			method: "GET",
			headers: {
				Authorization: `Basic ${SUSTAIN_CHANGE_API_KEY}`,
			},
		}
	);

	const hwiMessages = await response.json();

	return hwiMessages;
});

export const handlePassReset = createAsyncThunk('userdata/handlePassReset', async ( passData ) => {

	let userRequestData = new FormData();
            userRequestData.append( 'user_email', passData.user_email );
			userRequestData.append( 'step', passData.step );
			userRequestData.append( 'authcode', passData.authcode );
			userRequestData.append( 'pass', passData.pass );
			userRequestData.append( 'lang', passData.lang );

	const response = await fetch(
		`${API_BASE_URL}/sustainchange/v1/apppasswordreset/`,
		{
			method: "POST",
			headers: {
				Authorization: `Basic ${SUSTAIN_CHANGE_API_KEY}`,
			},
			body: userRequestData
		}
	);

	const userOwiData = await response.json();

	return userOwiData;
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
			.addCase(fetchHwiQuestions.fulfilled, (state, action) => {
				state.data[action.payload.field] = action.payload.questions
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
			.addCase(handlePassReset.fulfilled, (state, action) => {
				state.resetpass = action.payload
			})
	}
});

export default userDataSlice.reducer;