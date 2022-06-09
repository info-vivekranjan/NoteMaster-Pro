import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../redux/register/registerAction";

const Register = () => {
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.authRegister);
  const handleRegister = () => {
    dispatch(
      authRegister({ name: "Somi", email: "somi@gmail.com", password: "1234" })
    );
  };
  console.log(registerData);
  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
