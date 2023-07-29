import { Button } from "@/ims/components/components.module";
import { Space, Table, Modal } from "antd";
import { useState } from "react";

import { DashboardModals } from "../../components/components.module";

import useMedicineStore from "@/ims/store/store.medicine";

const InventoryTransactionPage = () => {
  const medicineStore: any = useMedicineStore((state) => state);
  const [modalState, setModalState] = useState<any>({
    action: () => {},
    toggleModal: () => {},
  });
  const [featureState, setFeatureState] = useState(false);

  const [toggleModal, setToggleModal] = useState({
    read: false,
    delete: false,
  });

  const actions = {
    toggleModalHandler: (modalType: string, state: boolean) => {
      setToggleModal({ ...toggleModal, [modalType]: state });
    },
  };

  const dataSource = medicineStore.transactions.map((el: any, index: any) => {
    return {
      key: index,
      name: el.medicineRequests?.name || el.patientRequests?.medication,
      quantity: el.medicineRequests?.quantity || el.patientRequests?.quantity,
      expiration: el.medicineRequests?.expiration,
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
      title: "Inventory",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "In (Date/Quantity)",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any) => (
        <div className="double-line">
          <p>{record.createdAt}</p>
          <p>{record.quantity}</p>
        </div>
      ),
    },
    {
      title: "Out (Date/Quantity)",
      dataIndex: "outDate",
      key: "outDate",
      render: (_: any, record: any) => (
        <div className="double-line">
          <p>~</p>
          <p>~</p>
        </div>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "-",
    //   key: "-",
    //   render: (_: any, record: any) => <p>{record.status}</p>,
    // },
    {
      title: "Type",
      dataIndex: "-",
      key: "-",
      render: (_: any, record: any) => (
        <div className="double-line">
          <p>{record.type}</p>
          <p></p>
        </div>
      ),
    },
    {
      title: "Cabinet",
      dataIndex: "-",
      key: "-",
      render: (_: any, record: any) => (
        <div className="double-line">
          <p>Steel Cabinet</p>
          <p>Drawer #3</p>
        </div>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: any, record: any) => {
    //     const modalActions = {
    //       openModal: (data: any, type: string) => {
    //         actions.toggleModalHandler(type, true);

    //         medicineStore.updateForm(data);

    //         setModalState({
    //           action: async (id: any, data?: any) => {
    //             actions.toggleModalHandler(type, false);
    //             if (type === "delete") await medicineStore.deleteById(id);
    //           },
    //           toggleModal: () => actions.toggleModalHandler(type, false),
    //         });
    //       },
    //     };
    //     return (
    //       <>
    //         <Space size="middle">
    //           <a onClick={() => modalActions.openModal(record, "delete")}>
    //             Delete
    //           </a>
    //         </Space>
    //       </>
    //     );
    //   },
    // },
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
          <div className="header">
            <h4>Medicine's/Medical Supplies-In and Out Transaction</h4>
            <p>
              <span> June 2023</span>
            </p>
            <hr />
            <Button name="Print Report" size="md" />
          </div>

          <Table columns={columns} dataSource={dataSource} className="table" />
        </div>
      </section>
    </>
  );
};

export default InventoryTransactionPage;
