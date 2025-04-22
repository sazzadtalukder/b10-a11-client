
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseTitle from '../../Hook/UseTitle';

const ViewDetails = () => {
    UseTitle('View Details | VolunteerHub');
  const data = useLoaderData();
  const {
    thumbnail,
    title,
    description,
    category,
    location,
    volunteersNeeded,
    deadline,
    organizerName,
    organizerEmail,
    _id
  } = data;
// console.log(data)
  const handleVolunteer = () => {
    if (volunteersNeeded < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Volunteer limit has been reached!",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        
        <div className="flex justify-center">
          <img
            src={thumbnail}
            alt={title}
            className="rounded-xl max-w-full shadow-md"
          />
        </div>

       
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{title}</h1>
          
          <p className="text-gray-600 text-lg">{description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              📂 {category}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              📍 {location}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              📅 Deadline: {deadline}
            </span>
          </div>

          <div className="mt-6 border-t pt-4 space-y-2">
            <p className="text-gray-700">
              <strong>Organizer:</strong> {organizerName}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {organizerEmail}
            </p>
            <p className="text-gray-700">
              <strong>Volunteers Needed:</strong>{" "}
              <span className={volunteersNeeded < 1 ? "text-red-600 font-bold" : "text-green-600 font-semibold"}>
                {volunteersNeeded > 0 ? volunteersNeeded : "No spots left"}
              </span>
            </p>
          </div>

          <div className="mt-4">
            {volunteersNeeded < 1 ? (
              <p className="text-red-500 font-semibold">Volunteer limit reached!</p>
            ) : (
              <Link to={`/beAVolunteer/${_id}`}>
                <button onClick={handleVolunteer} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                  Be a Volunteer
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
