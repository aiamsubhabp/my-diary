import { useState } from "react"
import {useFormik} from "formik"
import * as yup from 'yup'

function SignupForm({onLogin}){
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    const formSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .min(5, 'Username must be at least 5 characters long')
            .max(20, 'Username must not exceed 20 characters'),
        password: yup
            .string()
            .required('Please enter a password')
            .min(5, 'Password must be at least 5 characters long')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/api/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(r => {
                console.log('Response: ', r)
                if (r.ok) {
                    r.json().then(user => {
                        console.log('User: ', user)
                        onLogin(user)
                    })
                } else {
                    console.error('Failure to signup')
                }
            })
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input 
                type="text"
                id="username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}    
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input 
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    )

}

export default SignupForm