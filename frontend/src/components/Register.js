
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Alert } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {
  const [serverResponse, setServerResponse] = useState(null);

  const initialValues = {
    username: "",
    password: "",
    cv: null,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cv: Yup.mixed()
      .required("CV is required")
      .test("fileFormat", "Only PDF files are allowed", (value) => {
        return value && value.type === "application/pdf";
      }),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("cv", values.cv);

    try {
      const response = await axios.post("http://localhost:5000/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setServerResponse({ type: "success", message: response.data.message });
      resetForm();
    } catch (error) {
      setServerResponse({ type: "danger", message: "Error submitting the form" });
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {serverResponse && (
        <Alert variant={serverResponse.type}>{serverResponse.message}</Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form as={BootstrapForm}>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Username</BootstrapForm.Label>
              <Field
                name="username"
                type="text"
                as={BootstrapForm.Control}
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Password</BootstrapForm.Label>
              <Field
                name="password"
                type="password"
                as={BootstrapForm.Control}
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Upload CV (PDF only)</BootstrapForm.Label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => setFieldValue("cv", event.target.files[0])}
              />
              <ErrorMessage name="cv" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
