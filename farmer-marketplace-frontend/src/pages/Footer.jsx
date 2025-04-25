import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-green-100 text-green-900 py-10 px-6 md:px-20 rounded-t-3xl shadow-inner"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold mb-2">🌱 Farmer Market</h2>
          <p className="text-green-800 max-w-xs">
            Connecting local farmers with consumers directly. Fresh, local, and sustainable — always.
          </p>
        </div>

        {/* Explore (moved right) */}
        <div className="md:pl-[90px]">
          <h3 className="text-xl font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-green-800">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/aboutus" className="hover:underline">About Us</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-green-800">
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-green-800">
            <li>Email: support@farmermarket.com</li>
            <li>Phone: +91 0000000000</li>
            <li>Address: 123 Green Valley, Punjab, India</li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="max-w-6xl mx-auto mt-10 text-center">
        <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
        <div className="flex justify-center space-x-6 text-green-800">
          <a href="https://www.linkedin.com/in/ayush-rohan-227b31214" className="hover:text-green-500 transition"><FaLinkedin size={24} /></a>
          <a href="#" className="hover:text-green-500 transition"><FaTwitter size={24} /></a>
          <a href="https://www.instagram.com/ayushrohan5?igsh=eWZqNzZ2czNhYXo4" className="hover:text-green-500 transition"><FaInstagram size={24} /></a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-green-700 mt-10 text-sm">
        © {new Date().getFullYear()} Farmer Market. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
