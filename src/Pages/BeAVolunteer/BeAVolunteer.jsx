import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const BeAVolunteer = () => {
    const {user} = useContext(AuthContext)
    const data = useLoaderData();
    const navigate = useNavigate()
    console.log(data)
    const {thumbnail,
        title,
        description,
        category,
        location,
        volunteersNeeded,
        deadline,
        organizerName,
        organizerEmail} = data;
        
        const handleVolunteer = e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const initialData = Object.fromEntries(formData.entries());
            
            console.log(initialData);
            
            axios.post(`http://localhost:5000/addVolunteerRequested/${data._id}`, initialData,{withCredentials: true})
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/manageMyPosts')
                    }
                })
    
        }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">Be a volunteer</h1>
                <form className="card-body" onSubmit={handleVolunteer}>

                    <fieldset className="fieldset">
                        <label className="label">Thumbnail Link</label>
                        <input defaultValue={thumbnail} readOnly name='thumbnail' type="url" className="input" placeholder="Thumbnail Link" />
                        <label className="label">Post Title</label>
                        <input defaultValue={title} readOnly name='title' type="text" className="input" placeholder="Post Title" />
                        <label className="label">Description</label>
                        <textarea defaultValue={description} readOnly name='description' className="textarea" placeholder="Description"></textarea>
                        <label className="label">Category</label>
                        <input defaultValue={category} readOnly name='category' type="text" className="input" placeholder="Category" />
                        {/* <select defaultValue={category}  readOnly name='category' className="select">
                            <option disabled={true}>Select Category</option>
                            <option>healthcare</option>
                            <option> education</option>
                            <option>social service</option>
                            <option>animal welfare</option>
                        </select> */}
                        <label className="label">Location</label>
                        <input defaultValue={location} readOnly name='location' type="text" className="input" placeholder="Location" />
                        <label className="label">Number of volunteer needed</label>
                        <input defaultValue={volunteersNeeded} readOnly name='volunteersNeeded' type="number" className="input" placeholder="Number of volunteer needed" />
                        <label className="label">Deadline</label>
                        <input defaultValue={deadline} readOnly name='deadline' type="date" className="input" placeholder="Deadline" />
                        <label className="label">Organizer Name</label>
                        <input defaultValue={organizerName} readOnly name='organizerName' type="text" className="input" placeholder="Name" />
                        <label className="label">Organizer Email</label>
                        <input defaultValue={organizerEmail} readOnly name='organizerEmail'  type="email" className="input" placeholder="Email"  />
                        <label className="label">Volunteer Name</label>
                        <input defaultValue={user?.displayName} readOnly  name='volunteerName' type="text" className="input" placeholder="Name" />
                        <label className="label">Volunteer Email</label>
                        <input defaultValue={user?.email} readOnly name='volunteerEmail'  type="email" className="input" placeholder="Email"  />
                        <label className="label">Suggestion </label>
                        <textarea  name='suggestion' className="textarea" placeholder='Write your suggestion'></textarea>
                        <label className="label">Status</label>
                        <input defaultValue='Requested' readOnly  name='status' type="text" className="input" placeholder="Name" />
                        <button  className="btn btn-neutral mt-4">Request</button>

                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    );
};

export default BeAVolunteer;