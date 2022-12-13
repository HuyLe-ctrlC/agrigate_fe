import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cowGroupsApi from '../../api/cowGroupsApi';
// import cityApi from "../../api/cityApi";

//get all data, search, paging
export const getAllAction = createAsyncThunk(
    'cowGroups/list',
    async (params, { rejectWithValue, getState, dispatch }) => {
        try {
            // call Api
            const response = await cowGroupsApi.getAll(params);
            // console.log(response);
            if (response.result) {
                const results = {
                    data: response.data,
                    totalPage: response.totalPage,
                };
                return results;
            } else {
                return rejectWithValue(response.errors[0].msg);
            }
        } catch (error) {
            // console.log('Failed to fetch data list: ', error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//get data by id
export const getByIdAction = createAsyncThunk(
    'cowGroups/cowGroups',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            // call Api
            const response = await cowGroupsApi.getById(id);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // console.log('Failed to fetch data list: ', error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//create data
export const addDataAction = createAsyncThunk(
    'cowGroups/add',
    async (data, { rejectWithValue, getState, dispatch }) => {
        try {
            // call Api
            const response = await cowGroupsApi.add(data);
            // console.log(response);
            if (response.result) {
                const newData = response.data[0].newData;
                const results = {
                    data: newData,
                    msg: response.data[0].msg,
                };
                return results;
            } else {
                return rejectWithValue(response.errors[0].msg);
            }
        } catch (error) {
            // console.log("Failed to fetch data list: ", error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//update data by ID
export const updateDataAction = createAsyncThunk(
    'cowGroups/update',
    async (datas, { rejectWithValue, getState, dispatch }) => {
        const id = datas.id;
        const data = datas.data;
        try {
            // call Api
            const response = await cowGroupsApi.update(id, data);
            if (response.result) {
                const newData = response.data[0].newData;
                const results = {
                    id: id,
                    newData: newData,
                    msg: response.data[0].msg,
                };
                return results;
            } else {
                return rejectWithValue(response.errors[0].msg);
            }
        } catch (error) {
            // console.log("Failed to fetch data list: ", error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//update status by id
export const statusPublishAction = createAsyncThunk(
    'cowGroups/status',
    async (dataUpdate, { rejectWithValue, getState, dispatch }) => {
        const id = dataUpdate?.id;
        const publish = dataUpdate?.publish;
        try {
            const data = {
                publish: publish,
            };
            const body = JSON.stringify(data);
            const response = await cowGroupsApi.status(id, body);
            if (response.result) {
                const results = {
                    msg: response.data[0].msg,
                    publish: publish,
                    id: id,
                };
                return results;
            } else {
                return rejectWithValue(response.errors[0].msg);
            }
        } catch (error) {
            // console.log('Failed to fetch data list: ', error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//update sort by id
export const sortAction = createAsyncThunk(
    'cowGroups/sort',
    async (dataUpdate, { rejectWithValue, getState, dispatch }) => {
        const id = dataUpdate?.id;
        const sort = dataUpdate?.sort;
        try {
            const data = {
                sort: sort,
            };
            const body = JSON.stringify(data);
            const response = await cowGroupsApi.sort(id, body);
            if (response.result) {
                const results = {
                    msg: response.data[0].msg,
                };
                return results;
            } else {
                return rejectWithValue(response.errors[0].msg);
            }
        } catch (error) {
            // console.log('Failed to fetch data list: ', error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);
//delete data by id
export const deleteAction = createAsyncThunk(
    'cowGroups/delete',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            // call api
            const response = await cowGroupsApi.delete(id);
            if (response.result) {
                return id;
            } else {
                return rejectWithValue(response.errors[0].msg);
            }
        } catch (error) {
            // console.log('Failed to fetch data list: ', error);
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//update sort data by id

// init
const cowGroupsSlices = createSlice({
    name: 'cowGroups',
    initialState: {
        data: [],
        totalPage: 0,
        dataUpdate: [],
    },
    extraReducers: (builder) => {
        //get all
        builder
            .addCase(getAllAction.pending, (state, action) => {
                state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getAllAction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action?.payload?.data;
                state.totalPage = action?.payload?.totalPage;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getAllAction.rejected, (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            });
        //get data by ID
        builder
            .addCase(getByIdAction.pending, (state, action) => {
                state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.dataUpdate = action?.payload;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            });
        //add data
        builder
            .addCase(addDataAction.pending, (state, action) => {
                state.loading = true;
                state.msgSuccess = undefined;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(addDataAction.fulfilled, (state, action) => {
                state.loading = false;
                // add new data into store
                state.data = [action?.payload?.data].concat(state.data);
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(addDataAction.rejected, (state, action) => {
                state.loading = false;
                state.msgSuccess = undefined;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
        //update data
        builder
            .addCase(updateDataAction.pending, (state, action) => {
                state.msgSuccess = undefined;
                state.appError = undefined;
                state.serverError = undefined;
                state.loading = true;
            })
            .addCase(updateDataAction.fulfilled, (state, action) => {
                // find and update row data in store
                const checkIndex = state.data.findIndex((row) => row.id.toString() === action?.payload?.id.toString());
                if (checkIndex >= 0) {
                    state.data[checkIndex] = action?.payload?.newData;
                }
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
                state.loading = false;
            })
            .addCase(updateDataAction.rejected, (state, action) => {
                state.msgSuccess = undefined;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
        //delete data by id
        builder
            .addCase(deleteAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteAction.fulfilled, (state, action) => {
                state.loading = false;
                // delete row data in store
                state.data = state.data.filter((arrow) => arrow.id !== action.payload);
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(deleteAction.rejected, (state, action) => {
                state.loading = false;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });

        //update sort by id

        //edit status public
        builder
            .addCase(statusPublishAction.fulfilled, (state, action) => {
                // find and update row data in store
                const checkIndex = state.data.findIndex((row) => row.id.toString() === action?.payload?.id.toString());
                if (checkIndex >= 0) {
                    state.data[checkIndex].publish = action?.payload?.publish;
                }
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(statusPublishAction.rejected, (state, action) => {
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });

        //edit sort
        builder
            .addCase(sortAction.fulfilled, (state, action) => {
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(sortAction.rejected, (state, action) => {
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
    },
});

export const selectCowGroups = (state) => state?.cowGroups;

export default cowGroupsSlices.reducer;
