import React from 'react';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from '../components/Home';

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
        </Routes>
    </Router>
)