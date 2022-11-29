import { SiShopware } from "react-icons/si";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { auth, db } from "../Firebase/FirebaseApp";
import { FirebaseCrud } from "../Firebase/Curds";

const Login = () => {
  const navigate = useNavigate();
  const [submitButton, setSubmitButton] = useState(false)
  const [modal, setModal] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = () => {
    const { email, password } = modal
    setSubmitButton(true)
    auth.signInWithEmailAndPassword(email, password).then(async (signIn) => {
      const id = signIn.user._delegate.uid
      const result = await FirebaseCrud("Users", "getDocById", null, id)
      if (result) {
        setSubmitButton(false)
        navigate('/profile')
        const userInfo = { ...result, id }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      } else {
        setSubmitButton(false)
        auth.signOut()
        alert("User not exist")

      }
    }).catch((e) => {
      // setLoginLoader(false)
      setSubmitButton(false)
      alert(e.message)
    })

  }
  const handleChange = (e) => {
    const { value, name } = e.target
    setModal({
      ...modal,
      [name]: value
    })
  }
  return (
    <div className="bg-primaryL w-[100vw] h-[100vh] pt-[15vh]">
      <div className="flex items-center justify-center gap-2 p-4 w-[80%] max-w-md mx-auto text-xl font-extrabold tracking-tight">
        <SiShopware /> <span>F . E . M</span>
      </div>
      <div
        className=" p-8 w-[80%] max-w-md mx-auto  
        border rounded-md  bg-white
        shadow-lg drop-shadow-xl "
      >
        <h1 className="text-dark text-2xl font-bold mx-auto mb-4 text-center">
          Login
        </h1>
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <label>E-mail:</label>
            <input
              type="text"
              placeholder="asd@gmail.com"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={modal.email}
            />

          </div>
          <div className="flex flex-col gap-1">
            <label>Password:</label>
            <input
              type="password"
              placeholder="******"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={modal.password}
            />

          </div>
        </div>
        <Button type="submit" className="w100" onClick={handleSubmit} disabled={submitButton}>
          <p className="text-lg">Login</p>
        </Button>

      </div>
    </div>
  );
};

export default Login;
