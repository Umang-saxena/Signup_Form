import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      mobileNumber: Yup.string().max(10,"Mobile Number can't be more than 10").required("Mobile number is required"),
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
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"

            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}

          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}

          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="mobileNumber" className="mt-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            name="mobileNumber"
            placeholder="Enter mobile number"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.mobileNumber && formik.errors.mobileNumber}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.mobileNumber}
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
      <div className="mt-3">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>

    </Container>
  );
};

export default Register;
