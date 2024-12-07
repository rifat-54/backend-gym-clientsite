import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import AddAShedeul from './components/AddAShedeul.jsx';
import AllShedeul from './components/AllShedeul.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Updates from './components/Updates.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
    children:[
      {
        path:'/addashedeul',
        element:<AddAShedeul></AddAShedeul>
      },
      {
        path:'/allshedeul',
        element:<AllShedeul></AllShedeul>,
        loader:()=>fetch('https://crud-server-nu.vercel.app/sheduel')
      },
      {
        path:'signin',
        element:<Login></Login>
      },
      {
        path:'signup',
        element:<SignUp></SignUp>
      },
      {
       path:'/update/:id',
       element:<Updates></Updates>,
       loader:({params})=>fetch(`https://crud-server-nu.vercel.app/sheduel/${params.id}`)
      }
    ]
  },
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
    
  </StrictMode>,
)
