import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-green-200"
      >
        <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-green-700 text-center mb-8">
          We would love to hear from you. Drop your message and we will get back shortly.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            required
            className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 flex justify-center items-center gap-2 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
