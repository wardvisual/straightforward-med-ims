import { Input, Button } from "@/ims/components/components.module";

// import "../components.scss";

import "./patient.style.scss";
import useMedicineStore from "@/ims/store/store.medicine";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/ims/store/store.auth";
import { useEffect } from "react";

const PatientRequest = () => {
  const navigate = useNavigate();
  const medicineStore: any = useMedicineStore((state) => state);
  const authStore: any = useAuthStore((state) => state);

  const getUSer = () => {
    if (JSON.parse(JSON.stringify(localStorage.getItem("csu_user")))) {
      return JSON.parse(localStorage.getItem("csu_user") || "");
    }
    return {};
  };

  useEffect(() => {
    if (authStore.isAuthenticated && getUSer().role === "admin") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <section className="student__request">
        <div className="content">
          <div className="header">
            <h1>Health Services Unit</h1>
            <p>Medicine Log Sheet for Patients</p>
          </div>
          <form onSubmit={medicineStore.requestMedication}>
            <Input type="text" label="Full Name" name="fullName" required />
            <div className="col">
              <Input
                type="number"
                label="Student Number"
                name="studentNumber"
                min={0}
                required
              />
              <Input
                type="text"
                label="Course/Year"
                name="courseYear"
                required
              />
            </div>
            <div className="col">
              <Input
                type="select"
                label="Medication"
                name="medication"
                selectItems={medicineStore?.medicines}
              />
              <Input type="number" label="Quantity" name="quantity" min="1" />
            </div>
            <Input
              type="textarea"
              label="Compliant"
              name="compliant"
              required
            />

            <footer>
              <Button name="Request Medication" icon="send" type="submit" />
              <p className="link">
                Not a patient?&nbsp;
                <Link to="/">Go back</Link>
              </p>
            </footer>
          </form>
        </div>
      </section>
    </>
  );
};

export default PatientRequest;
