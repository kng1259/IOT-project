import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axiosInstance from '~/utils/axiosConfig'
import { env } from '~/utils/environment'

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await axiosInstance.post(`${env.API_ROOT}/api/v1/user/login`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await axiosInstance.delete(`${env.API_ROOT}/api/v1/user/logout`)
    if (showSuccessMessage) {
      toast.success('Đăng xuất thành công!')
    }
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })

    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
  }
})

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}
export const userReducer = userSlice.reducer