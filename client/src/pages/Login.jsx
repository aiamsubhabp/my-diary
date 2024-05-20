import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login({onLogin}) {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            {showLogin ? (
                <>
                    <LoginForm onLogin = {onLogin} />
                    <p>
                        Don't have an account? &nbsp;
                        <button type="button" onClick={() => setShowLogin(false)}>Sign Up</button>
                    </p>
                </>
                
                
            ) : 
                <>
                    <SignupForm onLogin = {onLogin} />
                </>
            }


        </>
    )
      
    
}

export default Login