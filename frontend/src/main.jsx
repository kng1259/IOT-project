import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import { BrowserRouter } from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

import { injectStore } from './utils/axiosConfig.js'
injectStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <App />
        <ToastContainer position='bottom-left' theme='colored' />
      </BrowserRouter>
    </PersistGate>
  </Provider>

)
