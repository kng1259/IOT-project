import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { dashboardReducer } from '~/redux/dashboard/dashboardSlice'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whiteList: ['user']
}

const reducers = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
