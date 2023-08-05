import React, { useEffect, useState } from 'react'
import {Button, Card, Col, Container, Form, Stack} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, getPost, setEdit,updatePost } from '../redux/features/postSlice';
import LoadingCard from './Loading';

const UserPost = ({history}) => {
    const navigate = useNavigate();
    const [id,setId] = useState();
    const [bodyText,setBodyText] = useState("");

    const dispatch = useDispatch();

    const {loading,data,edit,body} = useSelector((state)=>({...state.app}));

    useEffect(()=>{
        setBodyText(body);
    },[body])
    const onChangeInput = (e)=>{
        setId(e.target.value);
    }

    const fetchUserPost = ()=>{
        if(!id){
            window.alert("Please enter id");
        }else{
            dispatch(getPost({id}))
            console.log( dispatch(getPost({id})))
            setId("");
        }
    }

  return (
    <Stack direction='vertical' gap={2} className='d-flex justify-content-center align-items-center'>
        <h1>Fetch Post</h1>
        <Col sm="4">
        <Form.Control 
            type="text" 
            className='mb-3' 
            placeholder='Enter User Id'
            onChange={onChangeInput}
            value={id}/> 
        <Button className='mx-5' onClick={fetchUserPost} >Fetch User Post</Button>
        <Button onClick={()=>navigate("/create")}>Create User Post</Button>
        </Col>

        {
            loading ? (
                <LoadingCard count={1} />
                ):(
                    <> 
                        {data.length>0&&(
                            <div>
                                <Card style={{width:"300px"}} title={data[0].title}>
                                    <Card.Body>
                                        <Card.Title>{data[0].title}</Card.Title>
                                        <br/>
                                        <Card.Text>User Id:{data[0].id}</Card.Text>
                                        {
                                            
                                            edit?(
                                                <>
                                                <Card.Text>
                                                 <Form.Control 
                                                    type="text" 
                                                    onChange={(e)=>setBodyText(e.target.value)}
                                                    value={bodyText}
                                                    className='mb-3  '  
                                                  />
                                                  <br/>
                                                  <br/>
                                              
                                                </Card.Text>
                                                 <Col sm='2'>
                                                 <Button type='primary' onClick={()=>{dispatch(updatePost({
                                                    id:data[0].id,
                                                    body:bodyText,
                                                    title:data[0].title
                                                 }));
                                                    dispatch(setEdit({edit:false,body:data[0].body}))
                                                 }}>Save</Button>
                                                 <Button onClick={()=>dispatch(setEdit({edit:false,body:data[0].body}))}>Cancel</Button>
                                                 </Col>
                                                 </>
                                            ):(
                                                <Card.Text>
                                                <span>{data[0].body}</span>
                                                </Card.Text>
                                            ) 
                                            
                                            }
                                           
                                    </Card.Body>
                                </Card>
                                <Stack>
                                    <Button 
                                        style={{cursor:"pointer"}}
                                        type='primary'
                                        disabled={edit}
                                        variant='danger'
                                        onClick={()=>dispatch(deletePost({id:data[0].id}))}
                                        >Delete</Button>
                                    <Button
                                        variant='primary' onClick={()=>dispatch(setEdit({edit:true,body:data[0].body}))}>Edit{""}</Button>
                                </Stack>
                            </div>
                        )}
                    </>
                )
        }
        </Stack>
  )
}

export default UserPost
