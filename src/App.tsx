import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import RoutesPage from "./pages/RoutesPage/RoutesPage";


function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
            <Route path="/" element={<Layout/>}>
                {/* Public routes */}
                <Route index element={<LandingPage/>}/>
                <Route path="/login" element={<AuthPage/>}/>
                <Route path="/signup" element={<AuthPage/>}/>
                <Route path="/routes" element={<RoutesPage/>}/>


            </Route>
        </Route>
    ))

    return (
          <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
