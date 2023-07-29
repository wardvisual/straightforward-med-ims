import { Button } from "@/ims/components/components.module";

import "../components.scss";
import useMedicineStore from "@/ims/store/store.medicine";

const DeleteModal = ({ state }: any) => {
  const { form }: any = useMedicineStore((state) => state);

  return (
    <div className="dashboard__modal">
      <h4>{form?.name}</h4>
      <p>Are you sure you want to delete this medicine?</p>

      <footer>
        <Button name="Cancel" variant="outlined" onClick={state.toggleModal} />
        <Button name="Delete" onClick={() => state.action(form.id)} />
      </footer>
    </div>
  );
};

export default DeleteModal;
