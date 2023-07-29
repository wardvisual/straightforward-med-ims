import { Button } from "@/ims/components/components.module";

import "../components.scss";
import { useEffect } from "react";

const ReadModal = ({ data }: any) => {
  useEffect(() => {
    console.log({ data });
  }, []);
  return (
    <div className="dashboard__modal">
      <h4>{data?.name}</h4>
      <ul>
        <li>
          <span>Transaction Type:</span> {data?.type}{" "}
          {data?.type === `In`
            ? "(Admin/Nurse Medicine Request)"
            : "(Student Medication Request)"}
        </li>
        <li>
          <span>Quantity:</span> {data?.quantity}
          {data?.medicineRequests?.quantityUnit ||
            data?.adminRequests?.quantityUnit}
        </li>
        <li>
          <span>Issued At:</span> {data?.createdAt}
        </li>
      </ul>
      <Button name="Print Report" />
    </div>
  );
};

export default ReadModal;
