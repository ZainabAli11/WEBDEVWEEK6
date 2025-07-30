import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">CarRental</h2>
          <p className="text-sm text-gray-400">Drive your way with comfort and ease. Rent your dream car now!</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cars">Cars</Link></li>


          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl text-gray-300">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CarRental. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
