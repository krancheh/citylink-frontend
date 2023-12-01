import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";


function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
            <Route path="/" element={<Layout/>}>
                {/* Public routes */}
                <Route index element={<LandingPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="signup" element={<SignupPage/>}/>


            </Route>
        </Route>
    ))

    return (
          <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
