import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    // const composeEnhancers = 
    //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    //         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    //             // options like actionSanitizer, stateSanitizer
    //         }) : compose;

    // const enhancer = composeEnhancers(
    //     applyMiddleware(thunk)
    // );

    const enhancer =composeWithDevTools(applyMiddleware(logger,thunk))

    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}
