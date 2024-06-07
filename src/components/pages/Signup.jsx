import React,{useState} from "react";
import { Link } from "react-router-dom";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

//for auth
import {useAuth} from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [conPassword,setConPassword] = useState("")
  const [agree,setAgree] = useState("")
  const [error,setError] = useState("")
  const [loading, setLoading] = useState(false)

  const {signup} = useAuth()
  const navigate = useNavigate() //hook - must be kept on top level

  async function handleSubmit(e) {
      e.preventDefault()
      // console.log("Submitted")
      if(password !== conPassword){
        return setError("Passswords don't match") //returned so if true will break here
      }

      try {
        setError("")
        setLoading(true)
        await signup(email,username,password)
        navigate('/')
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError("Failed to create an account.")
      }
  }

  return (
    <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration />

        <Form onSubmit={handleSubmit} className={`${classes.signup}`}>

          <TextInput 
          type="text" 
          placeholder="Enter name" 
          required
          icon="person"
          value={username} onChange={(e)=> setUsername(e.target.value)}
          />

          <TextInput
            type="text"
            placeholder="Enter email"
            required
            icon="alternate_email"
            value={email} onChange={(e)=> setEmail(e.target.value)}
          />

          <TextInput 
          type="password" 
          required
          placeholder="Enter password" 
          icon="lock" 
          value={password} onChange={(e)=> setPassword(e.target.value)}
          />

          <TextInput
            type="password"
            required
            placeholder="Confirm password"
            icon="lock_clock"
            value={conPassword} onChange={(e)=> setConPassword(e.target.value)}
          />
          <p>{error}</p>

          <Checkbox 
          text="I agree to the Terms &amp; Conditions" 
          value={agree} 
          onChange={(e)=> setAgree(e.target.value)}
          />

          <Button disabled={loading} type='submit'> {/* loading === true => disabled*/}
            <span>Submit Now</span>
          </Button>

          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
          
        </Form>
      </div>
    </>
  );
}
