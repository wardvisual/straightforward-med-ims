import { Input, Button } from "@/ims/components/components.module";
import "./auth.style.scss";

import useAuthStore from "@/ims/store/store.auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const authStore: any = useAuthStore((state) => state);

  useEffect(() => {
    if (authStore.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authStore.isAuthenticated]);

  return (
    <section className="auth">
      <div className="side__overlay">
        <div className="side__body">
          {/* <h3>Cavite State University Medicine Inventory Management System</h3> */}
          <img src={`assets/arts/nurse-art-2.svg`} alt="image" />
        </div>
      </div>
      <div className="side__form">
        <form className="form" onSubmit={authStore.login}>
          <div className="form__header">
            <h2>CSU Clinic's IMS</h2>
            <p>Sign in to manage the CSU Clinic's medicines.</p>
          </div>
          <hr />
          <div className="form__body">
            <Input type="text" label="Username" name="username" />
            <Input type="password" label="Password" name="password" />
          </div>
          <footer>
            <Button name="Sign In" icon="key" type="submit" />
            <p className="link">
              Are you a patient?&nbsp;
              <Link to="/request">Request Medicine</Link>
            </p>
            {/* <Button variant="outlined" name="Forgot password" type="button" /> */}
          </footer>
        </form>
      </div>
    </section>
  );
};

export default Login;
