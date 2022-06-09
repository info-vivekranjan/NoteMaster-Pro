import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/auth/authAction";
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handelLogin = () => {
    dispatch(authLogin({ email: "vivek0003@hotmail.com", password: "1234" }));
  };
  console.log(auth);
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handelLogin}>Login</button>
    </div>
  );
};

export default Login;
