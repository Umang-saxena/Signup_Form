import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    // Check local storage for user info on component mount
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            navigate("/"); // Redirect to Admin page if user info exists
        }
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const response = await axios.post("http://localhost:5000/login", values);
                console.log("✅ Response:", response.data);
                setStatus({ success: "User logged in successfully!" });

                // Save user info in local storage
                localStorage.setItem("userInfo", JSON.stringify(response.data.user));

                // Check if the user is an admin
                if (response.data.user ) {
                    navigate("/"); // Redirect to Admin page
                } else {
                    setStatus({ error: "You are not authorized to access the Admin page. Please register." });
                }
            } catch (error) {
                console.error("❌ Error:", error.response?.data || error.message);
                setStatus({ error: "Failed to log in. Try again!" });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            {formik.status?.success && <Alert variant="success">{formik.status.success}</Alert>}
            {formik.status?.error && <Alert variant="danger">{formik.status.error}</Alert>}

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
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
                    {formik.isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </Form>
            <div className="mt-3">
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </Container>
    );
};

export default Login;