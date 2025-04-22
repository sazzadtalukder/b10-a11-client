

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import axios from 'axios';
import UseTitle from '../../Hook/UseTitle';

const ManageMyPosts = () => {
    UseTitle('Manage Posts | VolunteerHub');
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/allVolunteer?email=${user?.email}`).then(res => {
      setPosts(res.data);
      setLoadingPosts(false);
    });
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/allRequests?email=${user?.email}`).then(res => {
      setRequests(res.data);
      setLoadingRequests(false);
    });
  }, [user?.email, axiosSecure]);

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the post.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`https://b10-a11-server-six.vercel.app/allVolunteer/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            setPosts(posts.filter(post => post._id !== id));
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          }
        });
      }
    });
  };

  const handleCancel = id => {
    Swal.fire({
      title: "Cancel request?",
      text: "This will remove your request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`https://b10-a11-server-six.vercel.app/allRequests/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            setRequests(requests.filter(req => req._id !== id));
            Swal.fire("Cancelled!", "Your request has been removed.", "success");
          }
        });
      }
    });
  };

  if (loadingPosts || loadingRequests) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg text-neutral"></span>
      </div>
    );
  }
  
  return (
    
    <div className="p-4 lg:p-10">
      <h2 className="text-2xl font-bold text-center mb-8">Manage My Posts</h2>

      {/* My Volunteer Need Post */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">📢 My Volunteer Need Posts</h3>
        <div className="overflow-x-auto rounded shadow-lg bg-white">
          <table className="table w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.location}</td>
                  <td>
                    <Link to={`/updatePost/${post._id}`}>
                      <button className="btn btn-sm btn-outline btn-info">Update</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* My Volunteer Request Post */}
      <section>
        <h3 className="text-xl font-semibold mb-4">🙏 My Volunteer Requests</h3>
        <div className="overflow-x-auto rounded shadow-lg bg-white">
          <table className="table w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Category</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{request.title}</td>
                  <td>{request.location}</td>
                  <td>{request.category}</td>
                  <td>
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ManageMyPosts;
