import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import styled from 'styled-components'
import {Button} from '../styles'

function Login({onLogin}) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <Wrapper>
            <Logo>Diary App</Logo>
            {showLogin ? (
                <>
                    <LoginForm onLogin = {onLogin} />
                    <Divider />
                    <p>
                        Don't have an account? &nbsp;
                        <Button type="button" onClick={() => setShowLogin(false)}>Sign Up</Button>
                    </p>
                </>
            ) : 
                <>
                    <SignupForm onLogin = {onLogin} />
                    <Divider />
                    <p>
                        Already have an account? &nbsp;
                        <Button color="secondary" onClick = {() => setShowLogin(true)}>Log In</Button>
                    </p>
                </>
            }
        </Wrapper>
    )  
}

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: #20C997;
  margin: 8px 0 16px;
`;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login