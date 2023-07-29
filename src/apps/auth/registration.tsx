import { Input, Button } from "@/ims/components/components.module";
import "./auth.style.scss";

import useAuthStore from "@/ims/store/store.auth";
import { Link } from "react-router-dom";

const Login = () => {
  const authStore: any = useAuthStore((state) => state);

  return (
    <section className="auth">
      <div className="side__overlay">
        <div className="side__body">
          {/* <h3>Cavite State University Medicine Inventory Management System</h3> */}
          <img src={`assets/arts/nurse-art-2.svg`} alt="image" />
        </div>
      </div>
      <div className="side__form">
        <form className="form" onSubmit={authStore.register}>
          <div className="form__header">
            <h2>CSU Clinic's IMS</h2>
            <p>Testing Phase for Account Registration</p>
          </div>
          <hr />
          <div className="form__body">
            <Input type="text" label="First Name" name="firstName" />
            <Input type="text" label="Last Name" name="lastName" />
            <Input type="text" label="Username" name="username" />
            <Input type="text" label="Email Address" name="emailAddress" />
            <Input type="password" label="Password" name="password" />
          </div>
          <footer>
            <Button name="Register" type="submit" />
            <p>
              Already have an account?&nbsp;
              <Link to="/login">Login</Link>
            </p>
            {/* <Button variant="outlined" name="Forgot password" type="button" /> */}
          </footer>
        </form>
      </div>
    </section>
  );
};

export default Login;
