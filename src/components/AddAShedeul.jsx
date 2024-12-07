import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";


const AddAShedeul = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");

  // Handle time change for the second DatePicker
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update state with selected value
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;

    const formattedDate = selectedDate.toISOString().split("T")[0];

    const formattedTime = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const data={
        title,
        day:selectedOption,
        date:formattedDate,
        time:formattedTime,
        isComplited:false
    }
    console.log(data);

    fetch('https://crud-server-nu.vercel.app/sheduel',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully added sheduel",
                showConfirmButton: false,
                timer: 1500
              });
           
        }
    })

    // console.log(title, formattedDate, formattedTime, selectedOption);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-full flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body w-full border">
            <h2 className="text-3xl font-bold text-center mb-14">
              Add A Shedeul
            </h2>
            <div className="flex gap-10">
              {/* Title Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="input w-full input-bordered"
                />
              </div>

              {/* Date Picker */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <DatePicker
                  name="date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="input w-full input-bordered"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>

            <div className="flex gap-10">
              {/* Day Dropdown */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Day</span>
                </label>
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  className="select select-accent w-full "
                >
                  <option value={""} disabled>
                    Select Day
                  </option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Twesday</option>
                  <option>Wednesday</option>
                  <option>Thusday</option>
                  <option>Friday</option>
                </select>
              </div>

              {/* Time Picker */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Time</span>
                </label>
                <DatePicker
                  name="time"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15} // 15-minute intervals
                  timeCaption="Time"
                  dateFormat="h:mm aa" // Time format (e.g., 2:30 PM)
                  className="input w-full input-bordered"
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Schedule</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAShedeul;
