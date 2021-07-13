import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from './RootReducer'

const logger = createLogger()
const middleware = [logger, thunk]

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)