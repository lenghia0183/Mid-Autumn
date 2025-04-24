import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../../components/Header/index";
import Footer from "./../../components/Footer/index";
import GoToTop from "../../components/GoToTop";
import { useLoading } from "../../context/loadingContext";
import Backdrop from "../../components/BackDrop";
import LogoutListener from "../../components/LogoutListener";
import ChatButton from "../../components/ChatButton";
import ChatModal from "../../components/ChatModal";

const MainLayout = () => {
  const { isLoading } = useLoading();

  return (
    <div>
      <Header />
      <LogoutListener />
      <Backdrop open={isLoading} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <GoToTop />
      <ChatButton />
      <ChatModal />
    </div>
  );
};

export default MainLayout;
