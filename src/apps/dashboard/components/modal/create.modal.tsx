import { Input, Button } from "@/ims/components/components.module";

import "../components.scss";
import useMedicineStore from "@/ims/store/store.medicine";
import { useState } from "react";

const CreateModal = (prop: any) => {
  const medicineStore: any = useMedicineStore((state) => state);
  const [selectDrawer, setSelectDrawer]: any = useState([]);

  const onChange = (e) => {
    const cabinet = medicineStore?.cabinets.find(
      (cabinet) => cabinet.name === e.target.value
    );

    if (cabinet) {
      setSelectDrawer(
        cabinet.drawers.map((el) => ({
          name: el.name || "",
          value: el.id || "",
        }))
      );
    } else {
      setSelectDrawer([{ name: "No Drawers available", value: "None" }]);
    }
  };

  const units = [
    { name: "Pounds", value: "pounds" },
    { name: "Pieces", value: "pcs" },
    { name: "Gallons", value: "gallons" },
    { name: "Boxes", value: "boxes" },
    { name: "Kilos", value: "kls" },
  ];

  return (
    <form className="dashboard__modal" onSubmit={prop.createMedicine}>
      <Input type="text" label="Medicine Name" name="name" />
      <div className="col-3">
        <Input type="number" label="Stock" name="stock" min="0" />
        <Input type="number" label="Quantity" name="quantity" min="0" />
        <Input
          type="select"
          label="Unit"
          name="quantityUnit"
          selectItems={units}
        />
      </div>
      <div className="col">
        <Input type="date" label="Expiry Date" name="expiration" />
        <Input type="number" label="Thresholds" name="thresholds" min="0" />
      </div>
      <Input
        type="textarea"
        label="Description (Optional)"
        name="description"
      />
      {/* Do you want to save this to Medicines Cabinet? */}
      <div className="input-unit">
        <Input
          type="select"
          label="Choose a Medicine Cabinet"
          // name="cabinet"
          onChange={onChange}
          selectItems={medicineStore?.cabinets}
        />
        <Input
          type="select"
          label="Choose a Drawer"
          name="drawerId"
          selectItems={selectDrawer}
        />
      </div>

      <footer>
        <Button name="Add Medicine" type="submit" />
      </footer>
    </form>
  );
};

export default CreateModal;
