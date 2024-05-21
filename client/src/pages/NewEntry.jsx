import { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup'
import styled from 'styled-components'
import { Button, Error, FormField, Input, Label, Textarea } from "../styles"; 
import { useNavigate } from "react-router-dom";

function NewEntry({entries, setEntries}) {
    const [submissionStatus, setSubmissionStatus] = useState(null)
    const navigate = useNavigate()

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
                            setSubmissionStatus('success')
                            setTimeout(() => {
                                setSubmissionStatus(null)
                                navigate('/entries')
                            }, 1000);

                        })
                    } else {
                        console.error("failed to create new entry")
                    }
                })

        }
    })

    return(
        <Wrapper>
            <WrapperChild>
                <form onSubmit={formik.handleSubmit}>
                    <FormField>
                        <Label htmlFor="title">Title: </Label>
                        <Input
                            id="title"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title} 
                        />
                        <p style={{color:'red'}}>{formik.errors.title}</p>
                    </FormField>
                    <br/>
                    <FormField>
                        <Label htmlFor="post">What's on your mind?</Label>
                        <Textarea
                            id="post"
                            name="post"
                            onChange={formik.handleChange}
                            value={formik.values.post}
                            rows="10"
                        />
                        <p style={{color:'red'}}>{formik.errors.post}</p>
                    </FormField>
                    <Button type="submit">Publish Entry</Button>
                </form>
                {submissionStatus === 'success' && <p>Entry successfully added</p>}
            </WrapperChild>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewEntry