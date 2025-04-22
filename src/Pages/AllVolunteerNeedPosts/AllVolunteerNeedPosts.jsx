import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllVolunteerNeedPosts = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [loader,setLoader]= useState(true)
  
  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.searchTitle.value);
  }
  console.log(search)
  useEffect(() => {
    setLoader(true)
    axios.get(`http://localhost:5000/allVolunteer?title=${search}`)
      .then(res => {
        setPosts(res.data)
        setLoader(false)
      })
  }, [search])
  // console.log(posts)
  
  return (
    <div>
     {
      loader &&  <span className="loading loading-spinner loading-xl"></span>
     }
      <p>Search post by Title</p>
      
      <form className="card-body" onSubmit={handleSearch}>
        <fieldset className="fieldset">
          {/* <label className="label">Search by title</label> */}
          <input name='searchTitle' type="text" className="input" />
          <button className="btn btn-neutral mt-4">Search</button>
        </fieldset>

      </form>
      
      <button
        onClick={() => setIsTableLayout(!isTableLayout)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Change Layout
      </button>
      
      {
        isTableLayout ? <> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
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
                                    <div className="card-actions justify-center ">
                                        <Link to={`/allVolunteer/${post._id}`}>
                                            <button className="btn btn-primary w-full">View Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div></> : <>
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
                    posts.map((post, indx) => <tr key={indx}>
                      <th>{indx + 1}</th>
                      <td>{post.title}</td>
                      <td>{post.location}</td>
                      <td><Link to={`/updatePost/${post._id}`}><button>Update</button></Link></td>
                      <td><button onClick={() => handleDelete(post._id)}>Delete</button></td>
                    </tr>)
                  }


                </tbody>
              </table>
            </div>
            
          </div></>
      }
    </div>

  );
};

export default AllVolunteerNeedPosts;