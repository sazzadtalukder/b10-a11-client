import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ViewDetails = () => {

    const data= useLoaderData();
    const {thumbnail,
        title,
        description,
        category,
        location,
        volunteersNeeded,
        deadline,
        organizerName,
        organizerEmail} = data;
    console.log(data)
    const handleVolunteer =()=>{
        if(volunteersNeeded <1){
            console.log(volunteersNeeded)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
              return
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={thumbnail}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6">
                        {description}
                    </p>
                    <p>{category}</p>
                    <p>{location}</p>
                    <p>{volunteersNeeded}</p>
                    <p>{deadline}</p>
                    <p>{organizerName}</p>
                    <p>{organizerEmail}</p>
                    {
                        volunteersNeeded <1  ?<><p className="text-red-500 font-semibold mt-2">Volunteer limit reached!</p></> :<Link to={`/beAVolunteer/${data._id}`}><button  className="btn btn-primary">Be a Volunteer</button></Link>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;