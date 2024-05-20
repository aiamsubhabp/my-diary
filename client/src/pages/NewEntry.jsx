import { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'

function NewEntry({entries, setEntries}) {


    const formSchema = yup.object().shape({
        title: yup.string().required('Must enter title').max(50),
        post: yup.string().required('Must not be empty').max(1000)
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            post: ''
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('/api/entries', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
                .then(r => {
                    if (r.ok) {
                        r.json().then(res => {
                            setEntries([...entries, res])
                            resetForm()
                        })
                    } else {
                        console.error("failed to create new entry")
                    }
                })

        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title} 
                />
                <p style={{color:'red'}}>{formik.errors.title}</p>
                <br/>
                <label htmlFor="post">What's on your mind?</label>
                <textarea
                    id="post"
                    name="post"
                    onChange={formik.handleChange}
                    value={formik.values.post}
                    rows="10"
                />
                <p style={{color:'red'}}>{formik.errors.post}</p>
                <button type="submit">Submit Entry</button>

            </form>
        </div>
    )
}

export default NewEntry