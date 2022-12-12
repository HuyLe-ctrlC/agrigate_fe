import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlices';
import cowBreedsReducer from './slices/cowBreedsSlice';
import cowGroupsReducer from './slices/cowGroupsSlice';
import conditionReducer from './slices/conditionSlices';
import wgeReducer from './slices/wgeSlices';
import awgReducer from './slices/awgSlices';
import weightP0Reducer from './slices/weightP0Slices';
import wgsReducer from './slices/wgsSlices';
import adminReducer from './slices/adminSlices';
const store = configureStore({
    reducer: {
        form: formReducer,
        cowBreeds: cowBreedsReducer,
        cowGroups: cowGroupsReducer,
        condition: conditionReducer,
        wge: wgeReducer,
        awg: awgReducer,
        weightP0: weightP0Reducer,
        wgs: wgsReducer,
        admin: adminReducer,
    },
});

export default store;
