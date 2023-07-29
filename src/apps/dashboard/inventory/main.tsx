import { Button } from "@/ims/components/components.module";
import { Space, Table, Modal } from "antd";
import { useState } from "react";

import useMedicineStore from "@/ims/store/store.medicine";
import { DashboardModals } from "../components/components.module";

const InventoryTransactionPage = () => {
  const medicineStore: any = useMedicineStore((state) => state);
  const [modalState, setModalState] = useState<any>({
    action: () => {},
    toggleModal: () => {},
  });
  const [featureState, setFeatureState] = useState(false);

  const [toggleModal, setToggleModal] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
    request: false,
    createCabinet: false,
    viewCabinet: false,
  });

  const actions = {
    toggleModalHandler: (modalType: string, state: boolean) => {
      setToggleModal({ ...toggleModal, [modalType]: state });
    },
  };

  const dataSource = medicineStore.medicines.map((el: any, index: any) => {
    return {
      key: index,
      ...el,
    };
  });

  const columns = [
    {
      title: "Medicine",
      dataIndex: "name",
      key: "medicine",
      render: (text: any, record: any, index: any) => {
        const modalActions = {
          openModal: (data: any, type: string) => {
            actions.toggleModalHandler(type, true);

            medicineStore.updateForm(data);

            setModalState({
              action: async (id: any, data?: any) => {
                actions.toggleModalHandler(type, false);
              },
              toggleModal: () => actions.toggleModalHandler(type, false),
            });
          },
        };
        return (
          <>
            <Modal
              title="Medicine Details"
              open={toggleModal.read}
              onCancel={() => actions.toggleModalHandler("read", false)}
              centered
              footer={[]}
            >
              <DashboardModals.Read data={record} />
            </Modal>

            <a onClick={() => modalActions.openModal(record, "read")}>{text}</a>
          </>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Quantity",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any) => (
        <div className="double-line">
          <p>{record.createdAt}</p>
          <p>
            {record.quantity} {record.quantityUnit}
          </p>
        </div>
      ),
    },
    {
      title: "Expiration",
      dataIndex: "expiration",
      key: "expiration",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        const modalActions = {
          openModal: (data: any, type: string) => {
            actions.toggleModalHandler(type, true);

            medicineStore.updateForm(data);

            setModalState({
              action: async (id: any, data?: any) => {
                actions.toggleModalHandler(type, false);
                if (type === "delete") await medicineStore.deleteById(id);
                if (type === "update")
                  await medicineStore.updateMedicine(id, data);
              },
              toggleModal: () => actions.toggleModalHandler(type, false),
            });
          },
        };
        return (
          <>
            <Space size="middle">
              <a onClick={() => modalActions.openModal(record, "update")}>
                Edit
              </a>
              <a onClick={() => modalActions.openModal(record, "delete")}>
                Delete
              </a>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      {/* for deleting Medicine */}
      <Modal
        title="Delete Medicine"
        open={toggleModal.delete}
        onCancel={() => actions.toggleModalHandler("delete", false)}
        centered
        footer={[]}
      >
        <DashboardModals.Delete state={modalState} />
      </Modal>
      {/* for updating Medicine */}
      <Modal
        title="Update Medicine"
        open={toggleModal.update}
        onCancel={() => actions.toggleModalHandler("update", false)}
        centered
        footer={[]}
      >
        <DashboardModals.Update state={modalState} />
      </Modal>
      {/* for adding new Medicine */}
      <Modal
        title="Add new Medicine"
        open={toggleModal.create}
        onCancel={() => setToggleModal({ ...toggleModal, create: false })}
        centered
        footer={[]}
      >
        <DashboardModals.Create
          createMedicine={medicineStore?.createMedicine}
        />
      </Modal>
      {/* for requesting new Medicine */}
      <Modal
        title="Request new Medicine"
        open={toggleModal.request}
        onCancel={() => setToggleModal({ ...toggleModal, request: false })}
        centered
        footer={[]}
      >
        <DashboardModals.Request request={medicineStore?.request} />
      </Modal>
      {/* for create new Medicine */}
      <Modal
        title="Create New Cabinet"
        open={toggleModal.createCabinet}
        onCancel={() =>
          setToggleModal({ ...toggleModal, createCabinet: false })
        }
        centered
        footer={[]}
      >
        <DashboardModals.CreateCabinet
          createCabinet={medicineStore?.createCabinet}
        />
      </Modal>

      {/* for create new Medicine */}
      <Modal
        title="Cabinet"
        open={toggleModal.viewCabinet}
        onCancel={() => setToggleModal({ ...toggleModal, viewCabinet: false })}
        centered
        footer={[]}
      >
        <DashboardModals.ViewCabinet cabinets={medicineStore?.cabinet} />
      </Modal>

      <Modal
        title="Status"
        open={featureState}
        onCancel={() => setFeatureState(false)}
        centered
        footer={[]}
      >
        <h5>
          <span>To be implemented</span>
        </h5>
      </Modal>
      <section>
        <div className="wrapper --left">
          <div className="inventory__library">
            <div
              className="inventory__library--creator"
              onClick={() =>
                setToggleModal({ ...toggleModal, createCabinet: true })
              }
            >
              <i className="ti ti-plus"></i>
              <p>Create New Cabinet</p>
            </div>

            <div className="inventory__library--list">
              {medicineStore.cabinets?.map((el, i) => {
                if (i < 4) {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setToggleModal({ ...toggleModal, viewCabinet: true });
                        medicineStore?.selectCabinet(el);
                      }}
                    >
                      <i className="ti ti-box"></i>
                      <p>{el.name}</p>
                    </div>
                  );
                }
              })}
              <div className="more">
                <i className="ti ti-dots-circle-horizontal"></i>
                <p>View More</p>
              </div>
            </div>
          </div>
          <div className="header">
            <h4>Manage Medicines</h4>
            <hr />
            <footer>
              <Button
                name="Add new Medicine"
                size="md"
                onClick={() => setToggleModal({ ...toggleModal, create: true })}
              />
              <Button
                name="Request new Medicine"
                size="md"
                variant="outlined"
                onClick={() =>
                  setToggleModal({ ...toggleModal, request: true })
                }
              />
            </footer>
          </div>

          <Table columns={columns} dataSource={dataSource} className="table" />
        </div>
      </section>
    </>
  );
};

export default InventoryTransactionPage;
