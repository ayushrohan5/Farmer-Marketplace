import { motion } from "framer-motion";
import aboutImage from "../assets/about-us.png"; // Replace with your image path

const AboutUs = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-green-100 px-6 py-16"
      style={{ animation: "backgroundAnimation 2s ease-out" }}
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left Side - Image */}
        <motion.img
          src={aboutImage}
          alt="About Us"
          className="w-full max-w-sm h-auto rounded-3xl shadow-xl object-cover md:max-w-md"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Right Side - Text */}
        <motion.div
          className="md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-green-800 mb-4">About Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We are a passionate team dedicated to bridging the gap between
            farmers and consumers. Our platform empowers local farmers by giving
            them direct access to the market while providing consumers with
            fresh, organic, and traceable produce.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            By using modern technology and sustainable practices, we aim to
            build a transparent ecosystem that benefits both ends — helping the
            community grow healthier and stronger.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
