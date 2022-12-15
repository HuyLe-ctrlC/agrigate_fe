import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from '../../api/adminApi';

//login
export const loginAction = createAsyncThunk(
    'admin/login',
    async (dataUpdate, { rejectWithValue, getState, dispatch }) => {
        // const username = dataUpdate?.username;
        // const password = dataUpdate?.password;
        try {
            const response = await adminApi.login(dataUpdate);
            // console.log(response.data);
            // console.log(response.data.accessToken);
            const result = {
                token: response.data.accessToken,
                id: response.data.id,
            };
            localStorage.setItem('userInfo', JSON.stringify(response.data.accessToken));
            localStorage.setItem('userId', JSON.stringify(response.data.id));
            localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
            return result;
        } catch (error) {
            // console.log('Failed to fetch data list: ', error);
            if (!error.response) {
                throw error;
            }
            // console.log('rejectWithValue', error?.response?.data?.data?.msg);
            return rejectWithValue(error?.response?.data?.data?.msg);
        }
    },
);

//forgot password
export const forgotAction = createAsyncThunk('admin/forgot', async (email, { rejectWithValue, getState, dispatch }) => {
    try {
        // call Api
        // console.log('email', email);
        const response = await adminApi.forgot({ email });
        // console.log('response ', response);
        if (response.data.result) {
            // const newData = response.data.newData;
            const results = {
                msg: response.data.msg,
            };
            return results;
        } else {
            return rejectWithValue({ msg: response.data.msg });
        }
    } catch (error) {
        // console.log("Failed to fetch data list: ", error);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.email);
    }
});

//Logout action
export const logoutAction = createAsyncThunk(
    'admin/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo');
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//get user from the local storage and place into initialState
const userLoginFromStorage = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null;
const idLoginFromStorage = localStorage.getItem('userId') ? localStorage.getItem('userId') : null;

//get user info by id
export const getInfoAction = createAsyncThunk('admin/info', async (id, { rejectWithValue }) => {
    try {
        // call Api
        const response = await adminApi.getInfo(id);
        console.log('response', response);

        if (response.result) {
            const results = {
                name: response.data.name,
                username: response.data.username,
            };
            return results;
        } else {
            console.log(response?.message);
            return rejectWithValue(response?.message);
        }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
});

//get all data, search, paging
export const getAllAction = createAsyncThunk('admin/list', async (params, { rejectWithValue, getState, dispatch }) => {
    try {
        // call Api
        const response = await adminApi.getAll(params);
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
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//get data by id
export const getByIdAction = createAsyncThunk('admin/admin', async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        // call Api
        const response = await adminApi.getById(id);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        // console.log('Failed to fetch data list: ', error);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//create data
export const addDataAction = createAsyncThunk('admin/add', async (data, { rejectWithValue, getState, dispatch }) => {
    try {
        // call Api
        console.log(123);
        console.log('data', data);
        const response = await adminApi.add(data);
        console.log('response', response);
        if (response.result) {
            const newData = response.data.newData;
            const results = {
                data: newData,
                msg: response.data.msg,
            };
            return results;
        } else {
            console.log('response.errors.msg', response.errors.msg);
            return rejectWithValue(response.errors.msg);
        }
    } catch (error) {
        // console.log("Failed to fetch data list: ", error);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data?.data?.msg);
    }
});

//update data by ID
export const updateDataAction = createAsyncThunk(
    'admin/update',
    async (datas, { rejectWithValue, getState, dispatch }) => {
        const id = datas.id;
        const data = datas.data;

        try {
            // call Api
            const response = await adminApi.update(id, data);
            // console.log('response', response);
            if (response.result) {
                const newData = response.data[0].newData;
                const results = {
                    id: id,
                    newData: newData,
                    msg: response.data[0].msg,
                };
                return results;
            } else {
                // console.log('response.errors[0].msg', response.errors[0].msg);

                return rejectWithValue(response.errors[0].msg);
            }
        } catch (error) {
            // console.log('Failed to fetch data list: ', error);
            if (!error.response) {
                throw error;
            }
            // console.log('error?.response?.data', error?.response?.data?.data?.msg);

            return rejectWithValue(error?.response?.data?.data?.msg);
        }
    },
);

//update status by id
export const statusPublishAction = createAsyncThunk(
    'admin/status',
    async (dataUpdate, { rejectWithValue, getState, dispatch }) => {
        const id = dataUpdate?.id;
        const active = dataUpdate?.active;
        try {
            const data = {
                active: active,
            };
            const body = JSON.stringify(data);
            const response = await adminApi.status(id, body);
            console.log('response', response);
            if (response.result) {
                const results = {
                    msg: response.data[0].msg,
                    active: active,
                    id: id,
                };
                console.log('results', results);
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
export const deleteAction = createAsyncThunk('admin/delete', async (id, { rejectWithValue, getState, dispatch }) => {
    try {
        // call api
        const response = await adminApi.delete(id);
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
});

// update password by id
export const updatePasswordAction = createAsyncThunk(
    'admin/update-password',
    async (dataUpdate, { rejectWithValue, getState, dispatch }) => {
        // console.log(dataUpdate);
        const passwordCurrent = dataUpdate?.passwordCurrent;
        const passwordNew = dataUpdate?.passwordNew;
        const id = dataUpdate?.id;
        try {
            const data = {
                passwordCurrent: passwordCurrent,
                passwordNew: passwordNew,
            };
            const body = JSON.stringify(data);
            const response = await adminApi.updatePassword(id, body);
            // console.log(response);
            if (response.result) {
                const results = {
                    msg: response.data[0].msg,
                };
                return results;
            } else {
                return rejectWithValue(response.errors[0]);
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

// init
const adminSlices = createSlice({
    name: 'admin',
    initialState: {
        userAuth: {
            token: userLoginFromStorage,
            id: idLoginFromStorage,
        },
        data: [],
        totalPage: 0,
        dataUpdate: [],
    },
    extraReducers: (builder) => {
        //login
        builder
            .addCase(loginAction.pending, (state, action) => {
                state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth.token = action?.payload?.token;
                state.userAuth.id = action?.payload?.id;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.appError = action?.payload;
                console.log('action?.error?.message', action?.error?.message);
                state.serverError = action?.error?.message;
            });
        //logout
        builder
            .addCase(logoutAction.pending, (state, action) => {
                // state.loading = false;
            })
            .addCase(logoutAction.fulfilled, (state, action) => {
                // state.loading = false;
                state.userAuth = undefined;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(logoutAction.rejected, (state, action) => {
                // state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            });
        //update password
        builder
            .addCase(updatePasswordAction.pending, (state, action) => {
                // state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(updatePasswordAction.fulfilled, (state, action) => {
                // state.loading = false;

                state.passwordUpdated = action?.payload;
                state.passwordMsg = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(updatePasswordAction.rejected, (state, action) => {
                // state.loading = false;
                state.appErr = action?.payload?.msg;
                state.serverErr = action?.error?.message;
                // console.log(action.payload);
            });
        //forgot password
        builder
            .addCase(forgotAction.pending, (state, action) => {
                state.loading = true;
                state.msgSuccess = undefined;
                state.appError = undefined;
                state.serverError = undefined;
                // console.log('pendding', state.loading);
            })
            .addCase(forgotAction.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action?.payload?.msg);
                // add new data into store
                state.data = action?.payload?.data;
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
                // console.log('sss', state.loading);
            })
            .addCase(forgotAction.rejected, (state, action) => {
                state.loading = false;
                // console.log(action?.payload);
                state.msgSuccess = undefined;
                state.appError = action?.payload?.msg;
                state.serverError = action?.error?.message;
            });
        //get info
        builder
            .addCase(getInfoAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(getInfoAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth.info = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(getInfoAction.rejected, (state, action) => {
                state.loading = false;
                state.userAuth.info = action?.payload;
                state.userAuth.infoError = action?.error?.message;
            });
        //get all
        builder
            .addCase(getAllAction.pending, (state, action) => {
                // state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getAllAction.fulfilled, (state, action) => {
                // state.loading = false;
                state.data = action?.payload?.data;
                state.totalPage = action?.payload?.totalPage;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getAllAction.rejected, (state, action) => {
                // state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            });
        //get data by ID
        builder
            .addCase(getByIdAction.pending, (state, action) => {
                // state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getByIdAction.fulfilled, (state, action) => {
                // state.loading = false;
                state.dataUpdate = action?.payload;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(getByIdAction.rejected, (state, action) => {
                // state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            });
        //add data
        builder
            .addCase(addDataAction.pending, (state, action) => {
                // state.loading = true;
                state.msgSuccess = undefined;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(addDataAction.fulfilled, (state, action) => {
                // state.loading = false;
                // add new data into store
                state.data = [action?.payload?.data].concat(state.data);
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(addDataAction.rejected, (state, action) => {
                // state.loading = false;
                state.msgSuccess = undefined;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
        //update data
        builder
            .addCase(updateDataAction.pending, (state, action) => {
                // state.loading = true;
                state.msgSuccess = undefined;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(updateDataAction.fulfilled, (state, action) => {
                // state.loading = false;
                // find and update row data in store
                const checkIndex = state.data.findIndex((row) => row.id.toString() === action?.payload?.id.toString());
                if (checkIndex >= 0) {
                    state.data[checkIndex] = action?.payload?.newData;
                }
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(updateDataAction.rejected, (state, action) => {
                // state.loading = false;
                state.msgSuccess = undefined;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
        //delete data by id
        builder
            .addCase(deleteAction.pending, (state, action) => {
                // state.loading = true;
            })
            .addCase(deleteAction.fulfilled, (state, action) => {
                // state.loading = false;
                // delete row data in store
                state.data = state.data.filter((arrow) => arrow.id !== action.payload);
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(deleteAction.rejected, (state, action) => {
                // state.loading = false;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });

        //Update active by id
        builder
            .addCase(statusPublishAction.fulfilled, (state, action) => {
                // find and update row data in store
                const checkIndex = state.data.findIndex((row) => row.id.toString() === action?.payload?.id.toString());
                if (checkIndex >= 0) {
                    state.data[checkIndex].active = action?.payload?.active;
                }
                state.msgSuccess = action?.payload?.msg;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(statusPublishAction.rejected, (state, action) => {
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
    },
});

export const selectAdmin = (state) => state?.admin;

export default adminSlices.reducer;
