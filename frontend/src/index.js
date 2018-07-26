import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './Landing';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(<Landing />, document.getElementById('root'));
registerServiceWorker();
