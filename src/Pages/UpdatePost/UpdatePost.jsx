import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import UseTitle from '../../Hook/UseTitle';

const UpdatePost = () => {
    UseTitle('Update Post | VolunteerHub');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const locationS = useLocation();
    const data = useLoaderData();
    const { thumbnail,
        title,
        description,
        category,
        location,
        volunteersNeeded,
        deadline,
        organizerName,
        organizerEmail } = data;
    const handleUpdate = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());

        // console.log(initialData);
        axios.put(`https://b10-a11-server-six.vercel.app/updatePost/${data._id}`, initialData,{withCredentials: true})
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(locationS?.state ? locationS.state : '/')
                }
            })

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Update Your Post</h1>
                    <form className="card-body" onSubmit={handleUpdate}>

                        <fieldset className="fieldset">
                            <label className="label">Thumbnail Link</label>
                            <input defaultValue={thumbnail} name='thumbnail' type="url" className="input" placeholder="Thumbnail Link" />
                            <label className="label">Post Title</label>
                            <input defaultValue={title} name='title' type="text" className="input" placeholder="Post Title" />
                            <label className="label">Description</label>
                            <textarea defaultValue={description} name='description' className="textarea" placeholder="Description"></textarea>
                            <label className="label">Category</label>
                            <input defaultValue={category} name='category' type="text" className="input" placeholder="Category" />
                            <select defaultValue={category} name='category' className="select">
                                <option disabled={true}>Select Category</option>
                                <option>healthcare</option>
                                <option> education</option>
                                <option>social service</option>
                                <option>animal welfare</option>
                            </select>
                            <label className="label">Location</label>
                            <input defaultValue={location} name='location' type="text" className="input" placeholder="Location" />
                            <label className="label">Number of volunteer needed</label>
                            <input defaultValue={volunteersNeeded} name='volunteersNeeded' type="number" className="input" placeholder="Number of volunteer needed" />
                            <label className="label">Deadline</label>
                            <input defaultValue={deadline} name='deadline' type="date" className="input" placeholder="Deadline" />
                            <label className="label">Organizer Name</label>
                            <input defaultValue={organizerName} readOnly name='organizerName' type="text" className="input" placeholder="Name" />
                            <label className="label">Organizer Email</label>
                            <input defaultValue={organizerEmail} readOnly name='organizerEmail' type="email" className="input" placeholder="Email" />
                            <button className="btn btn-neutral mt-4">Update</button>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;