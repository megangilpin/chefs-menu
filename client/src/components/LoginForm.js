import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { useTheme } from '@material-ui/core/styles';
import * as Yup from "yup";

export default function UserForm() {
  const theme = useTheme();
  const error = "Incorrect email or password!";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required!"),
    password: Yup.string().min(6).required("Required!"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        
        <Form>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Field
                component={TextField}
                variant="outlined"
                name="email"
                type="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                variant="outlined"
                type="password"
                label="Password"
                name="password"
              />
            </Grid>
           
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={theme.MuiButton}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Form>

      )}
    </Formik>
  );
}
