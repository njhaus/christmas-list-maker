import Layout from "./Layout";

import { Outlet } from "react-router-dom";

const ListOutlet = () => {
  return (
    <>
      <Layout />
      <Outlet/>
    </>
  );
};

export default ListOutlet;