import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import mainApi from "../../Main/Api/Api";
import { useNavigate } from "react-router-dom";

import { err, login } from "../../Redux/Regester";

export default function Formcomponent(params) {
  let state = useSelector((state) => state.regester.value);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const senddata = async (val) => {
    let res = await mainApi(`/spotify`);
    if (res.data != null) {
      let find = res.data.filter((item) => item.lastName == val.firstName);
      if (find) {
        if (find[0].password == val.password) {
          navigate("/");
          var d = new Date();
          d.setTime(d.getTime() + 30 * 24960 * 60 * 1000);
          var expires = "expires=" + d.toGMTString();
          document.cookie =
            "login-user=" + find[0].lastName + ";" + expires + ";path=/";

          dispatch(login(...find));
          dispatch(err(""));
        } else {
          dispatch(err("Please enter the correct information"));
        }
      }
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          dispatch(login(values));
          senddata(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="formmain">
            <div
              className="inputbox"
              style={{
                border:
                  errors.firstName && touched.firstName
                    ? "2px solid #ca2c2c"
                    : "",
              }}
            >
              <div className="icon">
                <i class="fa-solid fa-at"></i>
              </div>
              <div className="input">
                <Field name="firstName" type="name" placeholder="Username" />
              </div>
            </div>
            {errors.firstName && touched.firstName ? (
              <div className="errordiv">{errors.firstName}</div>
            ) : null}
            <div
              className="inputbox"
              style={{
                border:
                  errors.password && touched.password
                    ? "2px solid #ca2c2c"
                    : "",
              }}
            >
              <div className="icon">
                <i class="fa-solid fa-lock"></i>
              </div>
              <div className="input">
                <Field name="password" type="password" placeholder="password" />
              </div>
            </div>
            {errors.password && touched.password ? (
              <div className="errordiv">{errors.password}</div>
            ) : null}
            <div className="errbox">{state.errordata}</div>
            <button
              className="submit"
              type="submit"
              style={{
                backgroundColor:
                  (errors.firstName && touched.firstName) ||
                  (errors.password && touched.password)
                    ? "#ca2c2c"
                    : "",
              }}
            >
              Log in
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
