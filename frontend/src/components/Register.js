import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await axios.post("http://localhost:5000/register", values);
        console.log("✅ Response:", response.data);
        setStatus({ success: "User registered successfully!" });
      } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
        setStatus({ error: "Failed to register. Try again!" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      {formik.status?.success && <Alert variant="success">{formik.status.success}</Alert>}
      {formik.status?.error && <Alert variant="danger">{formik.status.error}</Alert>}

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.username && formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="mt-3" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Registering..." : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
