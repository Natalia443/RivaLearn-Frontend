import { Outlet } from "react-router-dom";
import MainNavBar from "./MainNavBar";

function RootLayout() {
  return (
    <>
      <MainNavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
