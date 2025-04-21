import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// {
//     posts.slice(0, 6).map((post) => <div key={post._id} className="card bg-base-100  shadow-sm">
//         <figure>
//             <img
//                 src={post.thumbnail}
//                 alt="Shoes" />
//         </figure>
//         <div className="card-body">
//             <h2 className="card-title">{post.title}</h2>
//             <p>{post.description}</p>
//             <p>Deadline: {post.deadline}</p>
//             <div className="card-actions justify-center">
//                 <Link to={`/allVolunteer/${post._id}`}><button className="btn btn-primary">View Details</button></Link>
//             </div>
//         </div>
//     </div>)
// }
const SortedVolunteerNeed = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/allVolunteer`)
            .then(res => {
                const newData = res.data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                setPosts(newData)

            })
    }, [])

    console.log(posts)
    return (
        <div>
            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    posts.slice(0, 6).map((post) => <div key={post._id} className="card bg-base-100  shadow-sm">
                        <figure>
                            <img
                                c
                                src={post.thumbnail}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{post.title}</h2>
                            <div className='md:flex justify-between '>
                                <p>Category: {post.category}</p>
                                <p>Deadline: {post.deadline}</p>
                            </div>

                            <div className="card-actions justify-center">
                                <Link to={`/allVolunteer/${post._id}`}><button className="btn btn-primary">View Details</button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(0, 6).map((post) => (
                    <div
                        key={post._id}
                        className="card bg-white shadow-md hover:shadow-2xl  rounded-2xl overflow-hidden"
                    >
                        <figure className="h-48 overflow-hidden">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-lg font-semibold mb-2">{post.title}</h2>
                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                                <p>
                                    <span className="font-medium">Category:</span> {post.category}
                                </p>
                                <p>
                                    <span className="font-medium">Deadline:</span> {post.deadline}
                                </p>
                            </div>
                            <div className="card-actions justify-center">
                                <Link to={`/allVolunteer/${post._id}`}>
                                    <button className="btn btn-primary w-full">View Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default SortedVolunteerNeed;