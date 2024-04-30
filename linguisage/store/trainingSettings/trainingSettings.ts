import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITrainingSettings {
    buildSentence: boolean;
    numberOfSense: number;
    percentOfLearnedWords: number;
}

const initialState = {
    buildSentence: false,
    numberOfSense: 7,
    percentOfLearnedWords: 20,
};

const trainingSettings = createSlice({
    name: "trainingSettings",
    initialState,
    reducers: {
        setTrainingSettings: (state, action: PayloadAction<ITrainingSettings>) => {
            state.buildSentence = action.payload.buildSentence;
            state.numberOfSense = action.payload.numberOfSense;
            state.percentOfLearnedWords = action.payload.percentOfLearnedWords;
        },
    },
});

export const { setTrainingSettings } = trainingSettings.actions;
export default trainingSettings.reducer;
