import Main from "./main";
import Outlet from "./outlet";

import Transaction from "./transactions";
import MedicinesCabinet from "./medicines-cabinet";
import ExpiredMedicines from "./expired-medicines";

const InventoryPages = {
  Transaction,
  MedicinesCabinet,
  ExpiredMedicines,
};

const InventoryPageRenderer = {
  Main,
  Outlet,
};

export { InventoryPageRenderer, InventoryPages };
