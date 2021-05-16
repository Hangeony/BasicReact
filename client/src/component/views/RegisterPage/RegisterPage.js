import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";
import { withRouter } from "react-router-dom";
// import useInputs from "../../../utils/useInputs"; <- 이런방법도 있다.

function RegisterPage(props) {
  const dispatch = useDispatch();

  // const [state, onChange] = useInputs({
  //   email: "",
  //   name: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log(state);
    // console.log(
    //   `Email : ${Email} , Password : ${Password}, Name : ${Name} ConfirmPassword : ${ConfirmPassword}`
    // );
    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      console.log("reset", response);
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입 하는데에 실패하셨습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={Email}
          onChange={onEmailHandler}
        />

        <label>Name</label>
        <input type="text" name="name" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={Password}
          onChange={onPasswordHandler}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}
export default withRouter(RegisterPage);
