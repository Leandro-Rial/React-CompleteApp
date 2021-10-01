import React from "react";
import { Button, Box, TextField, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../actions/authActions";
import GoogleButton from "react-google-button";

const SignIn = () => {
  const dispatch = useDispatch();

  // SignIn Submit With Google

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  // SignIn Submit

  const signInUser = async (credentials) => {
    try {
      await dispatch(
        startLoginEmailPassword(credentials.email, credentials.password)
      );
    } catch (error) {
      Swal.fire("error", error.message, "error");
    }
  };

  return (
    <div className="bg-home">
      <div className="wrapper">
        <div className="content animate__animated animate__fadeIn">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string()
                .required("Please enter your password")
                .matches(
                  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                  "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                ),
            })}
            onSubmit={signInUser}
          >
            {({
              errors,
              isValid,
              touched,
              dirty,
              values,
              handleChange,
              handleSubmit,
            }) => (
              <>
                <Form
                  onSubmit={handleSubmit}
                >
                  {/* Title */}

                  <Box sx={{ mb: 3 }}>
                    <Typography color="textPrimary" variant="h3">
                      Sign In
                    </Typography>
                  </Box>

                  {/* Email */}

                  <Field
                    name="email"
                    type="email"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(errors.email) && Boolean(touched.email)}
                    helperText={Boolean(touched.email) && errors.email}
                  />

                  <Box height={14} />

                  {/* Password */}

                  <Field
                    name="password"
                    type="password"
                    as={TextField}
                    variant="outlined"
                    color="primary"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    fullWidth
                    error={
                      Boolean(errors.password) && Boolean(touched.password)
                    }
                    helperText={Boolean(touched.password) && errors.password}
                  />

                  <Box height={16} />

                  {/* Button */}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={!dirty || !isValid}
                  >
                    Sign In
                  </Button>
                </Form>
                <Box sx={{ mb: 3 }}>
                  {/* Button Google  */}

                  <GoogleButton
                    onClick={handleGoogleLogin}
                    style={{ width: "100%", marginBottom: "20px" }}
                  />

                  {/* Link SignIn */}

                  <Typography
                    color="textPrimary"
                    variant="body1"
                    className="psignin"
                  >
                    Do you haven't an account? create one{" "}
                    <Link to="signup">Sign Up</Link>
                  </Typography>
                </Box>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
