import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'
// import Entry from './components/Entry';
// import LayoutIndex from './components/LayoutIndex';
import LayoutShow from './constainers/LayoutShow';
// import NewLayout from './components/NewLayout';


const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <LayoutShow/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
