import { Outlet } from "react-router-dom";
import classes from "../styles/Layout.module.css";
import Nav from "./Nav";
import { AuthProvider } from "../contexts/AuthContext.jsx";

export default function Layout() {
  return (
    <>
    <AuthProvider>
      <Nav />
      <main className={classes.main}>
        <div className={classes.container}>
            <Outlet />
        </div>
      </main>
      </AuthProvider>
    </>
  );
}
