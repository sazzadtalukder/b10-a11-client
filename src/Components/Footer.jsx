import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-bold">VolunteerHub</p>
        <p className="text-sm mt-2">Connecting volunteers to meaningful causes.</p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-blue-500 mx-3">About</a>
          <a href="#" className="text-gray-400 hover:text-blue-500 mx-3">Contact</a>
          <a href="#" className="text-gray-400 hover:text-blue-500 mx-3">Privacy</a>
        </div>
        <p className="text-sm mt-4">&copy; {new Date().getFullYear()} VolunteerHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
