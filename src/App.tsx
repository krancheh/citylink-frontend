import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import RoutesPage from "./pages/RoutesPage/RoutesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TicketsPage from "./pages/TicketsPage/TicketsPage";


function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
            <Route path="/" element={<Layout/>}>
                <Route index element={<LandingPage/>}/>
                <Route path="/login" element={<AuthPage/>}/>
                <Route path="/signup" element={<AuthPage/>}/>
                <Route path="/routes" element={<RoutesPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/tickets" element={<TicketsPage/>}/>
            </Route>
        </Route>
    ))

    return (
          <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
