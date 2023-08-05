import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Create from './UserPost/Create';
import UserPost from './UserPost/';

function App() {
  return (
    <BrowserRouter>
    <h2 className='text-center'>Understand Redux Toolkit Using API</h2>
        <Routes>
          <Route path="/" exact Component={UserPost}/>
          <Route path='/create' exact Component={Create}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
