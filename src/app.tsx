import "./libs/styles/main.scss";

import { Route, Routes, useNavigate } from "react-router-dom";
import { notification } from "antd";

import { routes } from "./app.routes";
import { useEffect } from "react";
import useMedicineStore from "./libs/store/store.medicine";
import { useLocation } from "react-router-dom";
import useAuthStore from "./libs/store/store.auth";

const App = () => {
  const { pathname } = useLocation();
  const [api, contextHolder]: any = notification.useNotification();
  const navigate = useNavigate();

  const medicineStore: any = useMedicineStore((state) => state);
  const authStore: any = useAuthStore((state) => state);

  const toggleNotification = (type: string, content: any = {}) => {
    api[type]({
      message: content.title,
      description: content.description,
    });
  };

  // Subscribe to event and get notifications
  useEffect(() => {
    (async () => {
      await medicineStore.getNotification();
      medicineStore.countUnSeenNotifications();
    })();
  }, [
    pathname,
    medicineStore.hasChanges,
    medicineStore.unSeenNotificationCount,
  ]);

  // Fetch Medicines
  useEffect(() => {
    (async () => {
      await medicineStore.fetchAll("medicines");
    })();
  }, [pathname, medicineStore.hasChanges]);

  // Fetch Cabinets
  useEffect(() => {
    (async () => {
      await medicineStore.fetchAll("cabinets");
    })();
  }, [pathname, medicineStore.hasChanges]);

  // Fetch Cabinets
  useEffect(() => {
    (async () => {
      const drawers = await medicineStore.fetchAll(
        "drawers",
        `
        *, cabinetId, cabinets(*) 
      `
      );
    })();
  }, [pathname, medicineStore.hasChanges]);

  // Fetch Transactions
  useEffect(() => {
    (async () => {
      await medicineStore.fetchAll(
        "transactions",
        `
        *, 
        adminMedicineRequestId, 
        medicineRequests (
            *
          ),
        patientRequestId,
        patientRequests (
          *
        )
        `
      );
    })();
  }, [pathname, medicineStore.hasChanges]);

  // Fetch Notifications
  useEffect(() => {
    (async () => {
      await medicineStore.fetchAll("notifications");
    })();
  }, [pathname, medicineStore.hasChanges]);

  useEffect(() => {
    if (medicineStore.notification?.type || authStore.notification?.type) {
      toggleNotification(
        medicineStore.notification?.type || authStore.notification?.type,
        {
          title:
            medicineStore.notification?.title || authStore.notification?.title,
          description:
            medicineStore.notification?.description ||
            authStore.notification?.description,
        }
      );
    }
  }, [medicineStore.notification, authStore.notification]);

  useEffect(() => {
    if (authStore.isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Routes>
        {routes.map((page) => {
          if (page.children) {
            return (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <>
                    {contextHolder}
                    <page.element />
                  </>
                }
              >
                {page?.children.map((subPage: any) => (
                  <Route
                    key={subPage.path}
                    path={subPage.path}
                    element={
                      <>
                        {contextHolder}
                        <subPage.element />
                      </>
                    }
                  >
                    {subPage?.children?.map((subMiniPage: any) => (
                      <Route
                        key={subMiniPage.path}
                        path={subMiniPage.path}
                        element={
                          <>
                            {contextHolder}
                            <subMiniPage.element />
                          </>
                        }
                      />
                    ))}
                  </Route>
                ))}
              </Route>
            );
          } else {
            return (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <>
                    {contextHolder}
                    <page.element />
                  </>
                }
              ></Route>
            );
          }
        })}
      </Routes>
    </>
  );
};
export default App;
