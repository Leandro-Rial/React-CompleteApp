import React from "react";
import { Button, Box, TextField, Typography, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { startRegisterWithEmailAndPassword } from "../../actions/authActions";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();

  // SIgnUp Submit

  const signUpUser = async (user) => {
    try {
      
      await dispatch(
        startRegisterWithEmailAndPassword(
          user.email,
          user.password,
          user.firstName,
          user.lastName
        )
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
              password2: "",
              firstName: "",
              lastName: "",
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
              password2: Yup.string()
                .required("Please confirm your password")
                .when("password", {
                  is: (password) =>
                    password && password.length > 0 ? true : false,
                  then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password doesn't match"
                  ),
                }),
              firstName: Yup.string()
                .min(2, "FirstName must be at least 2 characters")
                .max(15, "FirstName must be up to 15 characters")
                .required("FirstName is required"),
              lastName: Yup.string()
                .min(2, "LastName must be at least 2 characters")
                .max(15, "LastName must be up to 15 characters")
                .required("LastName is required"),
            })}
            onSubmit={(user) => {
              signUpUser(user);
            }}
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
                  className="animate__animated animate__fadeIn"
                >
                  
                  {/* Title */}

                  <Box sx={{ mb: 3 }}>
                    <Typography color="textPrimary" variant="h3">
                      Sign Up
                    </Typography>
                  </Box>

                  {/* First Name */}

                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                      <Field
                        name="firstName"
                        type="text"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                        fullWidth
                        error={
                          Boolean(errors.firstName) &&
                          Boolean(touched.firstName)
                        }
                        helperText={
                          Boolean(touched.firstName) && errors.firstName
                        }
                      />
                    </Grid>

                    {/* Last Name */}
                    
                    <Grid xs={12} sm={6} item>
                      <Field
                        name="lastName"
                        type="text"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                        fullWidth
                        error={
                          Boolean(errors.lastName) && Boolean(touched.lastName)
                        }
                        helperText={
                          Boolean(touched.lastName) && errors.lastName
                        }
                      />
                    </Grid>

                    {/* Email */}

                    <Grid item xs={12}>
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
                    </Grid>

                    {/* Password */}

                    <Grid item xs={12}>
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
                        helperText={
                          Boolean(touched.password) && errors.password
                        }
                      />
                    </Grid>

                    {/* Confirm Password */}

                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        placeholder="Enter Password"
                        label="Confirm Password"
                        required
                        name="password2"
                        as={TextField}
                        variant="outlined"
                        color="primary"
                        value={values.password2}
                        onChange={handleChange}
                        fullWidth
                        error={
                          Boolean(errors.password2) &&
                          Boolean(touched.password2)
                        }
                        helperText={
                          Boolean(touched.password2) && errors.password2
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* Button */}

                  <Box height={16} />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={!dirty || !isValid}
                  >
                    Sign Up
                  </Button>
                </Form>

                {/* Link SignIn */}

                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="body1">
                    If you have an account <Link to="signin">Sign In</Link>
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

export default SignUp;
