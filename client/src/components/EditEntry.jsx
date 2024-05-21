import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import styled from 'styled-components'
import { Button, Error, FormField, Input, Label, Textarea } from "../styles"; 
import { useState } from "react";


function EditEntry({entries, setEntries}){
    const [submissionStatus, setSubmissionStatus] = useState(null)
    const navigate = useNavigate()

    const {id} = useParams()
    // console.log('param ID:', id)
    // console.log('ENTRIES:', entries)
    const entry = entries.find(entry => entry.id === Number(id))
    // console.log('entry:', entry)

    const formSchema = yup.object().shape({
        title: yup.string().required('Must enter title').max(50),
        post: yup.string().required('Must not be empty').max(1000)
    })

    const formik = useFormik({
        initialValues: {
            title: entry.title,
            post: entry.post
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch(`/api/entries/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(r => {
                if (r.status === 202) {
                    r.json().then(updatedEntry => {
                        setEntries(updatedEntries => 
                            updatedEntries.map(entry =>
                                entry.id === Number(id) ? updatedEntry : entry
                            )
                        )
                    })
                    setSubmissionStatus("success")
                    setTimeout(() => {
                        setSubmissionStatus(null)
                        navigate('/entries')

                    }, 2000);
                } else {
                    console.error('Failed to update entry')
                }
            }).catch(error => {
                console.error("Error:", error)
                alert('failed')
            })
        }
    })

    return (
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
                    <Button type="submit">Update Entry</Button>
                </form>
                {submissionStatus === 'success' && <p>Entry successfully updated</p>}
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
export default EditEntry