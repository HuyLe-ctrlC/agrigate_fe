import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import * as ROUTES from './constants/routes/routes';
// check login admin
import PrivateProtectRoute from './utils/ProtectedRoutes/PrivateProtectedRoute';
// category management
import { CowBreeds } from './pages/CowBreeds';
import { CowGroups } from './pages/CowGroups';
import { Condition } from './pages/Condition';
import { Wge } from './pages/Wge';
// account & role
import { Role } from './pages/Role';
import { Awg } from './pages/Awg';
import { Admin } from './pages/Admin';
import { Password } from './pages/Password';
import { Weight } from './pages/Weight';
import { WGS } from './pages/Wgs';

function App() {
    return (
        <div className="App vh-100">
            <Router>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route element={<PrivateProtectRoute />}>
                        <Route path={ROUTES.HOME} element={<Home />}>
                            {/* category manager */}
                            <Route path={ROUTES.UPDATE_PASSWORD} element={<Password />} />
                            <Route path={ROUTES.COW_BREEDS} element={<CowBreeds />} />
                            <Route path={ROUTES.COW_GROUPS} element={<CowGroups />} />
                            <Route path={ROUTES.CONDITION} element={<Condition />} />
                            <Route path={ROUTES.WGE} element={<Wge />} />
                            <Route path={ROUTES.WEIGHT} element={<Weight />} />
                            <Route path={ROUTES.WGS} element={<WGS />} />

                            {/* account & role */}
                            <Route path={ROUTES.AWG} element={<Awg />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
