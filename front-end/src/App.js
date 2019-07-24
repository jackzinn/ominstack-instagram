import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Routes from './routes';


function App() {
    return (
    // <div className="App">
    //     <h1>Hello World</h1>
    // </div>

        <BrowserRouter>
            <Header/>
            <Routes/>
        </BrowserRouter>
    );
}

export default App;
