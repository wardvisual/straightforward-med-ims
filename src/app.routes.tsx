import { Route } from "@/ims/types/routes.types";

import {
  Dashboard,
  Auth,
  Inventory,
  PatientRequest,
  HomePage,
} from "./apps/apps.module";

import { ReportsPage } from "./apps/dashboard/reports";
import { DashboardPage } from "./apps/dashboard/dashboard";

export const routes: Route[] = [
  {
    path: "/login",
    element: Auth.Login,
  },
  {
    path: "/registration",
    element: Auth.Registration,
  },
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/dashboard",
    element: Dashboard,
    children: [
      {
        path: "/dashboard",
        element: DashboardPage,
      },
      {
        path: "/dashboard/inventory",
        element: Inventory.InventoryPageRenderer.Outlet,
        children: [
          {
            path: "/dashboard/inventory/",
            element: Inventory.InventoryPageRenderer.Main,
          },
          {
            path: "/dashboard/inventory/transaction",
            element: Inventory.InventoryPages.Transaction,
          },
          {
            path: "/dashboard/inventory/medicines-cabinet",
            element: Inventory.InventoryPages.MedicinesCabinet,
          },
          {
            path: "/dashboard/inventory/expired-medicines",
            element: Inventory.InventoryPages.ExpiredMedicines,
          },
          {
            path: "*",
            element: () => <h1>You are unathorized to access this page</h1>,
          },
        ],
      },
      {
        path: "/dashboard/reports",
        element: ReportsPage,
      },
      {
        path: "*",
        element: () => <h1>You are unathorized to access this page</h1>,
      },
    ],
  },
  {
    path: `/request`,
    element: PatientRequest,
  },
  {
    path: "*",
    element: () => <h1>You are unathorized to access this page</h1>,
  },
];
