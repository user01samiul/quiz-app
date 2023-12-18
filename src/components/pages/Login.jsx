import React,{useState} from "react";
import { Link } from "react-router-dom";
import classes from "../../styles/Login.module.css";
import Button from "../Button";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

//for auth
import {useAuth} from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading, setLoading] = useState(false)

  const {login} = useAuth()
  const navigate = useNavigate() //hook - must be kept on top level

  async function handleSubmit(e) {    //asynchornous
      e.preventDefault()

      try {
        setError("")
        if(password.length<6) throw "incorrect password"
        setLoading(true)
        await login(email, password)
        navigate('/quiz-app')           //navigate
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError("Failed to login.")
      }
  }

  return (
    <>
      <h1>Login to your account</h1>

      <div className="column">
        <Illustration />
        <Form onSubmit={handleSubmit} className={`${classes.login}`}>

          <TextInput
            type="text"
            placeholder="Enter email"
            required
            icon="alternate_email"
            value={email} onChange={(e)=> setEmail(e.target.value)}
          />

          <TextInput 
          type="password" 
          placeholder="Enter password" 
          required
          icon="lock" 
          value={password} onChange={(e)=> setPassword(e.target.value)}
          />
          {error && <span>{error}</span>}
          <Button disabled={loading} type="submit">
            <span>Submit Now</span>
          </Button>

          <div className="info">
            Don't have an account? <Link to="/quiz-app/signup">Signup</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
