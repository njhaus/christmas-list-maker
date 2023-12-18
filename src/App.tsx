import { useState } from 'react'

import { Routes, Route } from "react-router-dom";

import Home from './pages/home/Home';
import List from './pages/list/List';
import UserRouter from './pages/user/UserRouter';
import CurrentUser from './pages/user/CurrentUser';
import ViewUser from './pages/user/ViewUser';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/*" element={<List />} />
        <Route path="/user" element={<UserRouter />} />
        <Route path="/user/current" element={<CurrentUser />} />
        <Route path="/user/view" element={<ViewUser />} />
      </Routes>
    </>
  );
}

export default App
