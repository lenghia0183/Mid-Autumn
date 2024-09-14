import { Outlet } from "react-router-dom";
import Header from "./../../components/Header/index";
import GoToTop from "./../../components/GoToTop/index";
import Footer from "./../../components/Footer/index";
import SideBar from "./SideBar";
import Breadcrumb from "./../../components/Breadcrumb/index";

function ProfileLayout() {
  const breadcrumbProfile = [
    {
      label: "Trang chủ",
      to: "/",
    },
    {
      label: "Tài khoản",
      to: "/profile",
    },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbProfile} />
      <main className="container grid grid-cols-12 gap-4 px-4 py-6">
        {/* SideBar chiếm 3 cột */}
        <aside className="col-span-3 rounded-md shadow-md">
          <SideBar />
        </aside>

        {/* Nội dung chính chiếm 9 cột */}
        <section className="col-span-9">
          <Outlet />
        </section>
      </main>
      <Footer />
      <GoToTop />
    </>
  );
}

// SideBar Component

export default ProfileLayout;
