import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import mainApi from "../../Main/Api/Api";
import { signup, err } from "../../Redux/Regester";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Formcomponent(params) {
  let state = useSelector((state) => state.regester.value);
  let navigate = useNavigate();

  let web;
  let dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
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
      web = res.data.find((item) => item.lastName == val.lastName);
      if (!web) {
        mainApi.post(
          `/spotify`,

          {
            ...val,
            recentplay: [{ name: "4040" }],
            like: ["emp"],
            follow: ["f"],
          }
        );
        dispatch(signup(val));
        dispatch(err(""));
        navigate("/");
        var d = new Date();
        d.setTime(d.getTime() + 30 * 24960 * 60 * 1000);
        var expires = "expires=" + d.toGMTString();
        document.cookie =
          "login-user=" + val.lastName + ";" + expires + ";path=/";
      } else {
        dispatch(err("This username is active"));
      }
    }
    console.log(res.data);
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(signup(values));
        senddata(values);
      }}
    >
      {({ errors, touched }) => {
        return (
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
                <i class="fa-solid fa-user"></i>
              </div>
              <div className="input">
                <Field name="firstName" type="name" placeholder="Full Name" />
              </div>
            </div>
            {errors.firstName && touched.firstName ? (
              <div className="errordiv">{errors.firstName}</div>
            ) : null}

            <div
              className="inputbox"
              style={{
                border:
                  errors.lastName && touched.lastName
                    ? "2px solid #ca2c2c"
                    : "",
              }}
            >
              <div className="icon">
                <i class="fa-solid fa-at"></i>
              </div>
              <div className="input">
                <Field name="lastName" type="name" placeholder="Username" />
              </div>
            </div>
            {errors.lastName && touched.lastName ? (
              <div className="errordiv">{errors.lastName}</div>
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
                  (errors.lastName && touched.lastName) ||
                  (errors.password && touched.password)
                    ? "#ca2c2c"
                    : "",
              }}
            >
              Sign up
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
