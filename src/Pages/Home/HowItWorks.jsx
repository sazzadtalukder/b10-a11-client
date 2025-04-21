import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { FaClipboardList, FaCheckDouble } from "react-icons/fa";
// Example Steps Data
const steps = [
  {
    title: "Register/Login",
    description:
      "Create your account and join the community. Access all volunteer opportunities and post your needs.",
    icon:<IoMdLogIn className="w-16 h-16 text-blue-500"/>
  
  
  ,
  },
  {
    title: "Post or Browse Volunteer Needs",
    description:
      "Post a volunteer need or explore available opportunities based on your interests and location.",
    icon: <FaClipboardList className="w-16 h-16 text-blue-500"/>,
  },
  {
    title: "Be a Volunteer",
    description:
      "Apply to volunteer and help where it matters most. Make an impact by contributing your time and skills.",
    icon: <FaCheckDouble className="w-16 h-16 text-blue-500" />
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 px-6 bg-gray-50 text-center my-20">
      <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <div className="flex justify-center mb-4">
             {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
