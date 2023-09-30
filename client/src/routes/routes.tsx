import React from 'react';
import { BrowserRouter, Routes as Routing, Route } from 'react-router-dom';

import Login from '../components/pages/Login';
import Homepage from '../components/pages/Homepage';

export interface IApplicationProps {};

const Routes: React.FC<IApplicationProps> = (props) => {

    return (
        <BrowserRouter>
            <Routing>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routing>
        </BrowserRouter>
    );
}

export default Routes;