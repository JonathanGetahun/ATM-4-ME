import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import './styles/index.css';

const hello = () => {
    console.log("hellow")
}

ReactDOM.render(<App />, document.getElementById('root'))