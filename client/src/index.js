import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import KeyForm from "./KeyForm";

ReactDOM.render(<KeyForm />, document.getElementById('root'));
registerServiceWorker();
