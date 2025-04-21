import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const ManageMyPosts = () => {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [requests, setRequests] = useState([])
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        // axios.get(`http://localhost:5000/allVolunteer?email=${user?.email}`,{withCredentials: true})
        axiosSecure.get(`/allVolunteer?email=${user?.email}`)
            .then(res => {
                setPosts(res.data)
            })
    }, [user?.email])
    console.log(posts)
    useEffect(() => {

        // axios.get(`http://localhost:5000/allRequests?email=${user?.email}`,{withCredentials: true})
        axiosSecure.get(`/allRequests?email=${user?.email}`)
            .then(res => {
                setRequests(res.data)
            })
    }, [user?.email])
    console.log(requests)
    const handleDelete = (id)=>{
        // console.log(id)
        axios.delete(`http://localhost:5000/allVolunteer/${id}`)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              });
            if (res.data.deletedCount > 0) {
                setPosts(posts.filter(post => post._id !== id)); 
            }
        })
        
    }
    const handleCancel =(id)=>{
        axios.delete(`http://localhost:5000/allRequests/${id}`)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              });
            if (res.data.deletedCount > 0) {
                setPosts(requests.filter(request => request._id !== id)); 
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post,indx)=><tr key={indx}>
                            <th>{indx+1}</th>
                            <td>{post.title}</td>
                            <td>{post.location}</td>
                            <td><Link to={`/updatePost/${post._id}`}><button>Update</button></Link></td>
                            <td><button onClick={()=>handleDelete(post._id)}>Delete</button></td>
                        </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
            <p>My Volunteer Request Post</p>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((request,indx)=><tr key={indx}>
                            <th>{indx+1}</th>
                            <td>{request.title}</td>
                            <td>{request.location}</td>
                            <td>{request.category}</td>
                            <td><button onClick={()=>handleCancel(request._id)}>Cancel</button></td>
                        </tr>)
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMyPosts;