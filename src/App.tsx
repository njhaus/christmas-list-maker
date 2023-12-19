import { useState } from 'react'

import { Routes, Route } from "react-router-dom";

import Home from './pages/home/Home';
import List from './pages/list/List';
import UserRouter from './pages/user/UserRouter';
import CurrentUser from './pages/user/CurrentUser';
import ViewUser from './pages/user/ViewUser';
import ListOutlet from './layouts/ListOutlet';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ListOutlet />}>
          <Route path="/list/*" element={<List />} />
          <Route path="/user" element={<UserRouter />} />
          <Route path="/user/current" element={<CurrentUser />} />
          <Route path="/user/view" element={<ViewUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
