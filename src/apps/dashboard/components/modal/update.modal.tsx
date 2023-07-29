import { Input, Button } from "@/ims/components/components.module";

import "../components.scss";
import useMedicineStore from "@/ims/store/store.medicine";

const UpdateModal = ({ state }: any) => {
  const { form, onChange }: any = useMedicineStore((state) => state);

  const selectItems = [
    {
      name: "Pounds",
      value: "lbs",
      defaultValue: form?.quantityUnit,
    },
    {
      name: "Pieces",
      value: "pcs",
      defaultValue: form?.quantityUnit,
    },
    {
      name: "Gallons",
      value: "gal",
      defaultValue: form?.quantityUnit,
    },
    {
      name: "Boxes",
      value: "boxes",
      defaultValue: form?.quantityUnit,
    },
    {
      name: "Kilos",
      value: "kgs",
      defaultValue: form?.quantityUnit,
    },
  ];
  return (
    <form
      className="dashboard__modal"
      onSubmit={(event: any) => state.action(form?.id, event)}
    >
      <Input
        type="text"
        label="Medicine Name"
        name="name"
        value={form.name}
        onChange={(event) => onChange(event)}
      />
      <div className="col-3">
        <Input
          type="number"
          label="Stock"
          name="stock"
          min="0"
          value={form?.stock}
          onChange={(event) => onChange(event)}
        />
        <Input
          type="number"
          label="Quantity"
          name="quantity"
          min="0"
          value={form?.quantity}
          onChange={(event) => onChange(event)}
        />
        <Input
          type="select"
          label="Unit"
          name="quantityUnit"
          selectItems={selectItems}
          onChange={(event) => onChange(event)}
        />
      </div>
      <Input
        type="date"
        label="Expiry Date"
        name="expiration"
        value={form?.expiration}
        onChange={(event) => onChange(event)}
      />
      <Input
        type="textarea"
        label="Description (Optional)"
        name="description"
        value={form?.description}
        onChange={(event) => onChange(event)}
      />
      {/* <Input
        type="checkbox"
        label="Do you want to remove this to Medicines Library?"
        name="expiration"
      /> */}
      <footer>
        <Button name="Cancel" variant="outlined" onClick={state.toggleModal} />
        <Button name="Update Medicine" type="submit" />
      </footer>
    </form>
  );
};

export default UpdateModal;
