import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Verma",
    role: "Farmer",
    rating: 5,
    review: "This platform has made it super easy to sell my farm products directly to consumers.",
  },
  {
    name: "Sneha Kapoor",
    role: "Consumer",
    rating: 4,
    review: "Loved the fresh vegetables and fruits. Delivery was on time!",
  },
  {
    name: "Amit Yadav",
    role: "Farmer",
    rating: 5,
    review: "It helped increase my income and the support team is really helpful.",
  },
  {
    name: "Neha Sharma",
    role: "Consumer",
    rating: 4,
    review: "Great quality and the prices were very reasonable.",
  },
  {
    name: "Ramesh Chauhan",
    role: "Farmer",
    rating: 5,
    review: "I love the transparency and the ability to set my own product prices.",
  },
  {
    name: "Priya Mehta",
    role: "Consumer",
    rating: 5,
    review: "Very smooth experience! Will definitely use it again.",
  },
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-lg w-80"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="text-xl font-semibold text-green-700 mb-1">{testimonial.name}</div>
    <div className="text-sm text-gray-500 mb-2">{testimonial.role}</div>
    <div className="flex items-center text-yellow-500 mb-3">
      {Array.from({ length: testimonial.rating }, (_, i) => (
        <Star key={i} fill="currentColor" className="h-4 w-4" />
      ))}
    </div>
    <div className="text-gray-700">{testimonial.review}</div>
  </motion.div>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 3;

  const next = () => {
    setIndex((prev) => (prev + itemsPerPage) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 4000); // auto slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const currentTestimonials = testimonials.slice(index, index + itemsPerPage);

  return (
    <div className="bg-gradient-to-br from-green-100 to-white py-12">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        What People Are Saying
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">
        <AnimatePresence mode="wait">
          {currentTestimonials.map((t, i) => (
            <TestimonialCard testimonial={t} key={`${t.name}-${i}`} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Testimonials;
