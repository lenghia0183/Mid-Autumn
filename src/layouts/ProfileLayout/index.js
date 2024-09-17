import { Outlet } from "react-router-dom";
import Header from "./../../components/Header/index";
import GoToTop from "./../../components/GoToTop/index";
import Footer from "./../../components/Footer/index";
import SideBar from "./SideBar";
import Breadcrumb from "./../../components/Breadcrumb/index";
import { PAGE_TITLE, PATH } from "../../constants/path";

function ProfileLayout() {
  const breadcrumbProfile = [
    {
      label: PAGE_TITLE.HOME,
      to: PATH.HOME,
    },
    {
      label: PAGE_TITLE.PROFILE,
      to: PATH.PROFILE,
    },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbProfile} />
      <main className="container grid grid-cols-12 gap-4 py-14">
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
