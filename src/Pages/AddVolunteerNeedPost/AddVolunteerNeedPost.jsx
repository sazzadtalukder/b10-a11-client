import React, { use, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddVolunteerNeedPost = () => {
    const { user } = useContext(AuthContext)
    const handleAddPost = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        console.log(initialData);
        axios.post('http://localhost:5000/addVolunteer', initialData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Add volunteer need post</h1>
                    <form className="card-body" onSubmit={handleAddPost}>

                        <fieldset className="fieldset">
                            <label className="label">Thumbnail Link</label>
                            <input name='thumbnail' type="url" className="input" placeholder="Thumbnail Link" />
                            <label className="label">Post Title</label>
                            <input name='title' type="text" className="input" placeholder="Post Title" />
                            <label className="label">Description</label>
                            <textarea name='description' className="textarea" placeholder="Description"></textarea>
                            <label className="label">Category</label>
                            <select name='category' defaultValue="Select Category" className="select">
                                <option disabled={true}>Select Category</option>
                                <option>healthcare</option>
                                <option> education</option>
                                <option>social service</option>
                                <option>animal welfare</option>
                            </select>
                            <label className="label">Location</label>
                            <input name='location' type="text" className="input" placeholder="Location" />
                            <label className="label">Number of volunteer needed</label>
                            <input name='volunteersNeeded' type="number" className="input" placeholder="Number of volunteer needed" />
                            <label className="label">Deadline</label>
                            <input name='deadline' type="date" className="input" placeholder="Deadline" />
                            <label className="label">Name</label>
                            <input name='organizerName' type="text" className="input" placeholder="Name" />
                            <label className="label">Email</label>
                            <input name='organizerEmail' defaultValue={user?.email} type="email" className="input" placeholder="Email" readOnly />

                            <button className="btn btn-neutral mt-4">Add Post</button>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVolunteerNeedPost;