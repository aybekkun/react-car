import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../store/slices/userSlice";
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const fd =new FormData();
    fd.append('phone', login)
    fd.append('password', password)
    dispatch(fetchAuth(fd))
  
  };
  return (
    <Container className="login">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
