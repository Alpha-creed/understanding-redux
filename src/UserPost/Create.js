import React, { useState } from 'react'
import { Button, Card, Col, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LoadingCard from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../redux/features/postSlice'

const Create = ({history}) => {
    const [values,setValues] = useState({title:"",body:""})
    const [showPost,setShowPost] = useState(false) 
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const {loading,data} =useSelector((state)=>({...state.app}))

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(createPost({values}))
        setValues({title:"",body:""})
         setShowPost(true)
    }

     const showPostBlog = () => {
    return (
      <>
        {loading ? (
          <LoadingCard count={1} />
        ) : (
          <div className="site-card-border-less-wrapper">
            <Card >
                <h1>{data[0].title}</h1>
                <Card.Body>
                <Card.Title>User Id: {data[0].id}</Card.Title>
              <Card.Text>{data[0].body}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <InputGroup  className='my-3 '>
            <Col sm="4">
                <Form.Control 
                    type="text" 
                    placeholder='Enter title'
                    onChange={(e)=>setValues({...values,title:e.target.value})}
                    value={values.title}
                    className='mb-3  '  
                    />
                <Form.Control 
                    type="text" 
                    placeholder='Enter Body'
                    onChange={(e)=>setValues({...values,body:e.target.value})}
                    value={values.body}
                    className='mb-3 my-3'
                    size='lg'  
                    />
                    </Col>
            </InputGroup>
            <Col sm="4">
            <Button className='mx-5' onClick={()=>navigate("/")} >Go Back</Button>
        <Button type="submit">Submit</Button>
            </Col>
        </Form>
        <br/>
        <br/>
        {showPost && <div>{showPostBlog()}</div>}
       
    </div>
  )
}

export default Create
