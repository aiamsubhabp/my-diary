import { useState } from "react";

function Login() {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <>
            {showLogin ? (
                <h1>Show Log in True</h1>
            ) : 
                <h1>Show Log in False</h1>
            }


        </>
    )
      
    
}

export default Login