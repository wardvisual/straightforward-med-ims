import { Select } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [];

for (let i = 1; i <= 10; i++) {
  options.push({
    value: `${i.toString(10)}`,
    label: `${i.toString(10)}`,
  });
}

import "../components.scss";
import Input from "@/ims/components/input";
import Button from "@/ims/components/button";
import useMedicineStore from "@/ims/store/store.medicine";
import { useEffect, useState } from "react";

const CreateCabinet = (prop: any) => {
  const medicineStore: any = useMedicineStore((state) => state);
  const [values, setValues]: any = useState([]);

  useEffect(() => {
    setValues(options.map((el, i) => ({ name: el.value, value: el.value })));
    console.log({ values, options });
  }, [options, medicineStore?.onChange]);

  const handleChange = (value: string | string[]) => {
    medicineStore?.onChange("drawer", value);
  };

  return (
    <form className="dashboard__modal" onSubmit={prop.createCabinet}>
      <Input
        type="text"
        label="Cabinet Name"
        name="cabinet"
        onChange={medicineStore?.onChange}
      />
      <div className="field">
        <label htmlFor="drawer">Drawers availabe in the Cabinet</label>
        <Select
          mode="tags"
          id="drawer"
          size="large"
          placeholder="Please select"
          defaultValue={["1", "2"]}
          onChange={handleChange}
          style={{ width: "100%" }}
          options={options}
        />
      </div>
      <footer>
        <Button name="Create Cabinet" type="submit" />
      </footer>
    </form>
  );
};

export default CreateCabinet;
