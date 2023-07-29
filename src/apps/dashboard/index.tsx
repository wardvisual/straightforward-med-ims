import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal, Dropdown } from "antd";

import "./dashboard.style.scss";

import { DashboardPage } from "./dashboard";
import { ReportsPage } from "./reports";
import Badge from "@/ims/components/badge";
import useAuthStore from "@/ims/store/store.auth";

import { greetBasedOnTime } from "@/ims/helpers/utils";

import { InventoryPageRenderer, InventoryPages } from "./inventory/";
import useMedicineStore from "@/ims/store/store.medicine";

export const sidebarMenu = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "layout-dashboard",
    element: DashboardPage,
  },
  {
    path: "/dashboard/inventory",
    name: "Inventory",
    icon: "building-warehouse",
    element: InventoryPageRenderer.Main,
    children: [
      {
        name: `Transactions`,
        path: `/dashboard/inventory/transaction`,
        icon: `list-check`,
        element: InventoryPages.Transaction,
        count: 15,
      },
      // {
      //   name: `Medicines Request`,
      //   path: `/dashboard/inventory/request`,
      //   icon: `notebook`,
      //   element: ReportsPage,
      // },
      {
        name: `Medicines Cabinet`,
        path: `/dashboard/inventory/medicines-cabinet`,
        icon: `box`,
        element: InventoryPages.MedicinesCabinet,
      },
      {
        name: `Expired Medicines`,
        path: `/dashboard/inventory/expired-medicines`,
        icon: `clock-down`,
        element: InventoryPages.ExpiredMedicines,
      },
    ],
  },
  {
    path: "/dashboard/reports",
    name: "Reports",
    icon: "file-description",
    element: ReportsPage,
  },
];

const Dashboard = () => {
  let navigate = useNavigate();
  const [openedDropdownMenu, setOpenedDropdownMenu] = useState(false);
  const authStore: any = useAuthStore((state) => state);
  const medicineStore: any = useMedicineStore((state) => state);
  const { pathname } = useLocation();

  const [modalState, setModalState] = useState<any>(false);
  const [toggleSidebar, setToggleSidebar] = useState<any>(false);

  const featureStatus = () => setModalState(!modalState);

  const showMenuContent = (children: any) => {
    if (children) {
      setOpenedDropdownMenu(!openedDropdownMenu);
    } else {
      setOpenedDropdownMenu(false);
    }
  };

  const handleToggleSidebar = () => setToggleSidebar(!toggleSidebar);

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      navigate("/");
    }
  }, []);

  const getUSer = () => {
    if (JSON.parse(JSON.stringify(localStorage.getItem("csu_user")))) {
      return JSON.parse(localStorage.getItem("csu_user") || "");
    }
    return {};
  };

  // useEffect(() => {
  //   if (authStore.isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  //   if (!authStore.isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [authStore.isAuthenticated]);

  return (
    <>
      <Modal
        title="Status"
        open={modalState}
        onCancel={() => setModalState(false)}
        centered
        footer={[]}
      >
        <h5>
          <span>To be implemented</span>
        </h5>
      </Modal>
      <section className="dashboard">
        <div
          className="sidebar"
          // style={{ left: toggleSidebar ? "unset" : "-20em" }}
        >
          <div className="logo">
            <img src="/assets/logo.svg" alt="" />
            {/* <i className="ti ti-x c-pointer" onClick={handleToggleSidebar}></i> */}
          </div>

          <hr />

          <div className="profile-badge">
            <img
              src="/assets/arts/nurse-art-2.svg"
              alt=""
              style={{ background: "var(--color-primary-300)" }}
            />
            <div>
              <p>
                <strong>
                  {getUSer().firstName} {getUSer().lastName}
                </strong>
              </p>
              <p>
                <i className="ti ti-lock-code"></i> Administrator
              </p>
            </div>
          </div>

          <hr />
          <ul>
            {sidebarMenu.map((el: any, i: number) => (
              <Link to={el.path} key={i}>
                <li
                  className={pathname === `/${el.path}` ? "active" : ""}
                  onClick={() => showMenuContent(el.children)}
                >
                  <div>
                    <i
                      className={`ti ti-${el.icon}`}
                      style={{
                        color: "var(--color-light-400)",
                        fontSize: "1.3rem",
                      }}
                    ></i>{" "}
                    {el.name}
                  </div>
                  {el.children && <i className="ti ti-arrow-back"></i>}
                </li>
                <div
                  className={`dropdown-bg ${
                    pathname === `/${el.path}` ? "active" : ""
                  }`}
                >
                  {el.children?.map((subEl: any, i: number) => (
                    <Link to={subEl.path} key={i}>
                      <ul>
                        <li
                          onClick={!subEl.count ? featureStatus : () => 0}
                          className={
                            pathname === `${subEl.path}` ? "active" : ""
                          }
                        >
                          <i className={`ti ti-${subEl.icon}`}></i>
                          {subEl.name}{" "}
                          {subEl.count && <Badge content={subEl.count} />}
                        </li>
                      </ul>
                    </Link>
                  ))}
                </div>
              </Link>
            ))}
          </ul>
        </div>
        <div className="dashboard__content">
          <nav>
            <div className="content --left">
              <div className="nav__item--left">
                <i
                  className="ti ti-menu c-pointer"
                  onClick={handleToggleSidebar}
                ></i>
                <h5>{greetBasedOnTime(getUSer().firstName)}</h5>
              </div>
              <div className="nav__item--right">
                <div
                  className="action c-pointer notif-bell"
                  onClick={medicineStore.readNotification}
                >
                  <i className="ti ti-bell"></i>
                  {medicineStore.unSeenNotificationCount > 0 && (
                    <Badge
                      content={medicineStore.unSeenNotificationCount}
                      variant="primary"
                    />
                  )}
                </div>

                <div className="action c-pointer" onClick={authStore.logout}>
                  <i className="ti ti-logout"></i>
                </div>
              </div>
            </div>
          </nav>

          <section>
            <div className="--left">
              <h4>
                <span>🏠{pathname}</span>
              </h4>
            </div>
            {pathname !== `/inventory` ? (
              <InventoryPageRenderer.Outlet />
            ) : (
              <InventoryPageRenderer.Main />
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
