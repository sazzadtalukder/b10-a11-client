import React from "react";

// Example Success Stories Data
const successStories = [
  {
    name: "Amina Rahman",
    photo: "https://i.ibb.co.com/Ndfzsjgk/83ae357fec8eba398717da5e96b247b3-XL.jpg",
    event: "Tree Plantation Drive",
    testimonial:
      "It felt amazing to contribute to the environment. The organizers were supportive and the community came together beautifully.",
    rating: 5,
  },
  {
    name: "Zahid Hossain",
    photo: "https://i.ibb.co.com/35gzbBPX/images.jpg",
    event: "Flood Relief in Sylhet",
    testimonial:
      "Helping flood victims gave me a new perspective on life. I’m grateful for this platform.",
    rating: 4,
  },
  {
    name: "Sarah Jamil",
    photo: "https://i.ibb.co.com/jvY2hd3d/download.jpg",
    event: "Beach Cleanup",
    testimonial:
      "The beach cleanup event was such an eye-opener. It was wonderful to see so many people working together for a common cause!",
    rating: 5,
  },
];

const SuccessStories = () => {
    return (
      <section className="py-12 px-6 bg-gray-100 text-center my-20">
        <h2 className="text-3xl font-semibold mb-10">Volunteer Success Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={story.photo}
                  alt={story.name}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{story.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{story.event}</p>
              <p className="text-gray-700 mb-4">{story.testimonial}</p>
              <div className="text-yellow-500">
                {"★".repeat(story.rating)}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default SuccessStories;