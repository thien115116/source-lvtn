import { useState } from "react";
import "../../assets/vendor/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/icon_tran.png";
import formLoginSubmit from "../../services/loginService";
import "./Login.css";
import Lottie from "react-lottie";
import loginLoadBG from "../../assets/lottie/loginLoadBackground.json";

const UncontrolledLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginLoadBG,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="lottie__1">
      <Lottie options={defaultOptions} />
    </div>
  );
};
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    formLoginSubmit(body, props);
  }

  return (
    <section className="wrap" style={{ position: "relative" }}>
      <div className="container">
        <div className="row login__form">
          <div className="login__box d-flex">
            <div className="col-lg-6 d-flex m-auto justify-content-center ">
              <div className="">
                <div className="login__logo-title">
                  <img
                    src={logo}
                    alt="Khong co anh"
                    className="logo__img d-block"
                  ></img>
                  <h4 className="d-block form__title">BOOFOOD LOGIN</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 login__content d-flex">
              <form className="form_content" onSubmit={handleSubmit}>
                <div className="form-group form__input">
                  <i className="fa fa-envelope form__email-icon"></i>
                  <input
                    className="form-control input--primary"
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ex: admin@boofood.com"
                  ></input>{" "}
                </div>{" "}
                <div className="form-group form__input">
                  <i className="fa fa-lock form__pwd-icon"></i>
                  <input
                    type="password"
                    class="form-control input--primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                  ></input>{" "}
                </div>{" "}
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    className="form-control font-weight-bold align-center btn btn-primary btn--medium"
                    disabled={!validateForm()}
                    value="LOG IN"
                  ></input>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
        <UncontrolledLottie />
      </div>
    </section>
  );
}
