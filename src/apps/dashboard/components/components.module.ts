import CreateCabinet from "./modal/create-cabinet.modal";
import ViewCabinetModal from "./modal/view-cabinet.modal";
import CreateModal from "./modal/create.modal";
import DeleteModal from "./modal/delete.modal";
import ReadModal from "./modal/read.modal";
import RequestModal from "./modal/request.modal";
import UpdateModal from "./modal/update.modal";

const DashboardModals = {
  Create: CreateModal,
  Delete: DeleteModal,
  Read: ReadModal,
  Update: UpdateModal,
  Request: RequestModal,
  CreateCabinet: CreateCabinet,
  ViewCabinet: ViewCabinetModal,
};
export { DashboardModals };
