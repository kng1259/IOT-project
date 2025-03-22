import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        activeAreaId: '',
        activeFarmId: ''
    },

    reducers: {
        setDashboardAreaId: (state, action) => {
            state.activeAreaId = action.payload
        },
        setDashboardFarmId: (state, action) => {
            state.activeFarmId = action.payload
        }
    },

    extraReducers: () => {}
})

export const { setDashboardAreaId, setDashboardFarmId } = dashboardSlice.actions

export const selectActiveAreaId = (state) => {
    return state.dashboard.activeAreaId
}

export const selectActiveFarmId = (state) => {
    return state.dashboard.activeFarmId
}

export const dashboardReducer = dashboardSlice.reducer