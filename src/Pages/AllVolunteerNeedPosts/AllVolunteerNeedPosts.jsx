import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllVolunteerNeedPosts = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [isTableLayout, setIsTableLayout] = useState(true);

  const handleSearch = e => {
    e.preventDefault();
    setSearch(e.target.searchTitle.value);
  }
  console.log(search)
  useEffect(() => {
    axios.get(`http://localhost:5000/allVolunteer?title=${search}`)
      .then(res => {
        setPosts(res.data)
      })
  }, [search])
  // console.log(posts)
  return (
    <div>
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
        isTableLayout ? <><div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

          {
            posts.map((post) => <div key={post._id} className="card bg-base-100  shadow-sm">
              <figure>
                <img
                  src={post.thumbnail}
                  alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.description}</p>
                <p>Deadline: {post.deadline}</p>
                <div className="card-actions justify-center">
                  <Link to={`/allVolunteer/${post._id}`}><button className="btn btn-primary">View Details</button></Link>
                </div>
              </div>
            </div>)
          }
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