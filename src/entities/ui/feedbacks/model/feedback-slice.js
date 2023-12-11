import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import feedbackApi from '../../../../shared/api/feedback-api';

const initialState = {
  feedbacks: [],
};

export const getFeedbacks = createAsyncThunk(
  'feedbacks/get',
  async (_, { rejectWithValue }) => {
    try {
      const result = await feedbackApi.getFeedbacks();

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const feedbacksSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedbacks.fulfilled, (state, { payload }) => ({
      ...state,
      feedbacks: payload,
    }));
  },
});

export default feedbacksSlice.reducer;
