import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllShedeul = () => {
  const Loadeddata = useLoaderData();
  const { isConfirmed } = Loadeddata;
  const [data, setData] = useState(Loadeddata);
  const[search,setSearch]=useState("")

  useEffect(()=>{
    fetch(`https://crud-server-nu.vercel.app/sheduel?searchParams=${search}`,{

    })
    .then(res=>res.json())
    .then(result=>{
      setData(result);
    })
  },[search])

  const handleStatus = (id) => {

    fetch(`https://crud-server-nu.vercel.app/status/${id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            // if (result.modifiedCount) {
            //   const remaining = data.map((user) => user._id === id?{...data,isComplited:true}:{user});
            //   setData(remaining);

              
            // }
          });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://crud-server-nu.vercel.app/sheduel/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            if (result.deletedCount) {
              const remaining = data.filter((user) => user._id !== id);
              setData(remaining);

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div>
      AllShedeul
      <div className="w-1/2 mx-auto my-14">
        <input
          name="search"
          type="text"
          onChange={e=>setSearch(e.target.value)}
          placeholder="search"
          className="input w-full input-bordered"
        />
      </div>
      <div className="overflow-x-auto w-full mx-auto">
        <table className="table bg-white">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Date</th>
              <th>Day</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((user, idx) => (
              <tr className="">
                <td>{idx + 1}</td>
                <td>{user?.title}</td>
                <td>{user?.date}</td>
                <td>{user?.day}</td>
                <td>{user?.time}</td>
                <td className="space-x-5">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn"
                  >
                    X
                  </button>
                  <Link to={`/update/${user._id}`} className="btn">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleStatus(user._id)}
                    className="btn"
                  >
                    Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllShedeul;
