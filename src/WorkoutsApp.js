import React, { useState } from "react";
import { LoginScreen } from "./components/login/LoginScreen";
// import { HomeScreen } from "./components/HomeScreen";
import { MusclesList } from "./components/muscles/MuscleList";
import { Navbar } from "./components/ui/Navbar";
import { Sidebar } from "./components/ui/Sidebar";
import { CustomSnackbar } from "./components/ui/Snackbar";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";

export const WorkoutsApp = () => {
  // const [openSidebar, setOpenSidebar] = useState(false);

  // const openCloseSidebar = () => {
  //   setOpenSidebar(!openSidebar);
  // };

  return (
    <Provider store={store}>
      <CustomSnackbar />
      <AppRouter />
    </Provider>

    // (
    //   // <div className="WorkoutsApp">
    //   //   <Sidebar openCloseSidebar={openCloseSidebar} openSidebar={openSidebar} />
    //   //   <div className={`${openSidebar ? "background-inactive" : ""}`}>
    //   //     <Navbar openCloseSidebar={openCloseSidebar} />
    //   //     {/* <HomeScreen /> */}
    //   //     <div className="container">
    //   //       <AppRouter />
    //   //     </div>
    //   //   </div>
    //   // </div>
    //   <>
    //     <CustomSnackbar />
    //     <LoginScreen />
    //   </>
    // )
  );
};
