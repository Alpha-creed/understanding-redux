import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const getPost = createAsyncThunk("post/getPosts",async ({id})=>{
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.data;
});


export const deletePost = createAsyncThunk("post/delPosts",async ({id})=>{
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return res.data;
})

export const createPost = createAsyncThunk("post/delPosts",async ({values})=>{
    let config={
        headers:{
            "Content-type":"application/json",           
        }
    }
    let body = JSON.stringify({
        title:values.title,
        body:values.body,
    })

    const res = await axios.post(`https://jsonplaceholder.typicode.com/posts/`,body,config)
    return res.data;
})

export const updatePost = createAsyncThunk("post/updatePosts",async ({id,body,title})=>{
    let config={
        headers:{
            "Content-type":"application/json",           
        }
    }
    let datas = JSON.stringify({
        title,
        body,
    })

    const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,datas,config)
    return res.data;
})

const postSlice = createSlice({
    name:'post',
    initialState:{
        data:[],
        loading:false,
        error:null,
        edit:false,
    },
    reducers: {
        setEdit:(state,action)=>{
            state.edit=action.payload.edit;
            state.body=action.payload.body;
        },
    },
    extraReducers:{
        [getPost.pending]:(state,action)=>{
            state.loading = true;
        },
        [getPost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.data =[action.payload];
        },
        [getPost.rejected]:(state,action)=>{
            state.loading = false;
            state.error=action.error.message;
        },
        [deletePost.pending]:(state,action)=>{
            state.loading = true;
        },
        [deletePost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.data =action.payload;
        },
        [deletePost.rejected]:(state,action)=>{
            state.loading = false;
            state.error=action.error.message;
        },
        [createPost.pending]:(state,action)=>{
            state.loading = true;
        },
        [createPost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.data =[action.payload];
        },
        [createPost.rejected]:(state,action)=>{
            state.loading = false;
            state.error=action.error.message;
        },
        [updatePost.pending]:(state,action)=>{
            state.loading = true;
        },
        [updatePost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.data =[action.payload];
        },
        [updatePost.rejected]:(state,action)=>{
            state.loading = false;
            state.error=action.error.message;
        },
    },
});

export default postSlice.reducer;

export const {setEdit} = postSlice.actions