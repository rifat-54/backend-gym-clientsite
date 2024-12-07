import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const Updates = () => {
    const data=useLoaderData()
    const [title,setTitle]=useState(data.title)
    const idx=useParams()
    const id=idx.id;
    // console.log(id.id);
   


    const handleSubmit=e=>{
        e.preventDefault()

        const updateData={
            title:title
        }

        fetch(`https://crud-server-nu.vercel.app/update/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(updateData)
        })
        .then(res=>res.json())
        .then(result=>console.log(result))
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="card-body w-full border">
            <h2 className="text-3xl font-bold text-center mb-14">
              Add A Shedeul
            </h2>
           
            
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={e=>setTitle(e.target.value)}
                  
                  className="input w-full input-bordered"
                />
              </div>

             
              
            

            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Schedule</button>
            </div>
          </form>
        </div>
    );
};

export default Updates;