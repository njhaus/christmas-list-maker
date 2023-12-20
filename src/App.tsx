import { useState } from 'react'

import { Routes, Route } from "react-router-dom";

import Home from './pages/home/Home';
import List from './pages/list/List';
import UserRouter from './pages/user/UserRouter';
import AuthProvider from './context/AuthProvider';
import ListOutlet from './layouts/ListOutlet';

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ListOutlet />}>
            <Route path="/list/*" element={<List />} />
            <Route path="/user/*" element={<UserRouter />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App
