import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UseTitle from '../../Hook/UseTitle';

const AllVolunteerNeedPosts = () => {
  UseTitle('All volunteer need posts | VolunteerHub');
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [loader, setLoader] = useState(true)

  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.searchTitle.value);
  }
  // console.log(search)
  useEffect(() => {
    setLoader(true)
    axios.get(`https://b10-a11-server-six.vercel.app/allVolunteer?title=${search}`)
      .then(res => {
        setPosts(res.data)
        setLoader(false)
      })
  }, [search])
  // console.log(posts)

  return (
    <div>
      {
        loader && <span className="loading loading-spinner loading-xl"></span>
      }



      <form className="card-body space-y-4" onSubmit={handleSearch}>
        <p className="text-lg font-medium">Search post by Title</p>

        <div className="form-control">
          <input
            name="searchTitle"
            type="text"
            placeholder="Enter title..."
            className="input  w-full"
          />
        </div>

        <button type="submit" className="btn btn-neutral">
          Search
        </button>
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
                <thead className='bg-gray-100 text-gray-700'>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Deadline</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    posts.map((post, indx) => <tr key={indx}>
                      <th>{indx+1}</th>
                      <td>{post.title}</td>
                      <td>{post.location}</td>
                      <td>{post.category}</td>
                      <td>{post.deadline}</td>
                      <td><Link to={`/allVolunteer/${post._id}`}>
                        <button className="btn btn-primary w-full">View Details</button>
                      </Link></td>
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