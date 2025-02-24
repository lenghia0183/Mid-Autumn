import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../../../components/Icon";
import { PAGE_TITLE, PATH } from "../../../constants/path";
import Button from "../../../components/Button";

import { useUser } from "../../../context";
import { triggerLogout } from "../../../utils";
import { useTranslation } from "react-i18next";

function SideBar() {
  const { logout, user: userData } = useUser();
  console.log("user", userData.user);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const accountLinks = [
    { name: t(PAGE_TITLE.PROFILE), path: PATH.PROFILE_EDIT, icon: "edit" },
    {
      name: t(PAGE_TITLE.CHANGE_PASSWORD),
      path: t(PATH.CHANGE_PASSWORD),
      icon: "key",
    },
  ];

  const transactionLinks = [
    { name: t(PAGE_TITLE.ORDER), path: PATH.ORDER, icon: "order" },
    // {
    //   name: t(PAGE_TITLE.VIEWED_PRODUCTS),
    //   path: t(PATH.VIEWED_PRODUCTS),
    //   icon: "eye",
    // },
    { name: t(PAGE_TITLE.FAVORITE), path: PATH.FAVORITE, icon: "heart" },
  ];

  return (
    <nav className="p-4 sm:pb-[150px] pb-[100px] bg-white-100 border-r border-gray-200">
      <div className="mb-4">
        <div className="text-dark text-xl font-semibold">
          {userData?.user?.fullname}
        </div>
        <div className="text-gray-400 text-lg ">{userData?.user?.email}</div>
      </div>

      <div className="mb-6">
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-yellow"></div>
          <h2 className="flex-1 font-semibold text-dark text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            QUẢN LÝ TÀI KHOẢN
          </h2>
        </div>
        <ul className="space-y-2">
          {accountLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 p-2 text-yellow text-lg font-medium hover:text-yellow rounded"
                    : "flex items-center space-x-2 p-2 text-dark text-lg font-medium hover:text-yellow rounded"
                }
              >
                {/* <span>{link.icon}</span> */}
                <Icon name={link.icon} size="1.3em" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-yellow"></div>
          <h2 className="flex-1 font-semibold text-dark text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            QUẢN LÝ GIAO DỊCH
          </h2>
        </div>
        <ul className="space-y-2">
          {transactionLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 p-2 text-yellow text-lg font-medium hover:text-yellow rounded"
                    : "flex items-center space-x-2 p-2 text-dark text-lg font-medium hover:text-yellow rounded"
                }
              >
                {/* <span>{link.icon}</span> */}
                <Icon name={link.icon} size="1.3em" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Button
        full
        className="mt-10"
        onClick={() => {
          logout(navigate);
        }}
      >
        {t("common.logout")}
      </Button>
    </nav>
  );
}

export default SideBar;
