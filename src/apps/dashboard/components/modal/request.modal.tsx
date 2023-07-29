import { Input, Button } from "@/ims/components/components.module";

import "../components.scss";
import { useEffect, useState } from "react";

const RequestModal = (prop: any) => {
  const [quantity, setQuantity] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(quantity * unitCost);
  }, [quantity, unitCost]);

  const selectItems = [
    {
      name: "Pounds",
      value: "lbs",
    },
    {
      name: "Pieces",
      value: "pcs",
    },
    {
      name: "Gallons",
      value: "gal",
    },
    {
      name: "Boxes",
      value: "boxes",
    },
    {
      name: "Kilos",
      value: "kgs",
    },
  ];

  return (
    <form className="dashboard__modal" onSubmit={prop.request}>
      <Input type="text" label="Medicine Name" name="name" />
      <div className="input-unit">
        <Input
          type="number"
          label="Quantity"
          name="quantity"
          min="0"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          type="select"
          label="Unit"
          name="quantityUnit"
          selectItems={selectItems}
        />
      </div>
      <Input
        type="number"
        label="Unit Cost"
        name="unitCost"
        min="0"
        onChange={(e) => setUnitCost(e.target.value)}
      />
      <Input
        type="number"
        label="Total"
        name="total"
        min="0"
        value={totalAmount}
        readOnly
      />

      <footer>
        <Button name="Request Medicine" type="submit" />
      </footer>
    </form>
  );
};

export default RequestModal;
