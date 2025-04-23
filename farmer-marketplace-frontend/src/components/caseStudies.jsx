import { motion } from "framer-motion";
import React from "react";

const caseStudies = [
  {
    title: "Connecting Farmers to Local Buyers",
    description:
      "Increased farmer revenue by 35% through direct-to-consumer sales, cutting out middlemen via our platform.",
    image: "https://framerusercontent.com/images/l3XqVLhHbdouOOBZBDizONjLFo.jpg?scale-down-to=2048",
  },
  {
    title: "Optimizing Inventory & Logistics",
    description:
      "Helped small-scale farms manage stock efficiently with real-time updates and order tracking.",
    image: "https://tse2.mm.bing.net/th?id=OIP.V3AczQbqrG9BEEOeSwnIKQHaDt&pid=Api&P=0&h=220",
  },
  {
    title: "Empowering Rural Communities",
    description:
      "Created new opportunities for women and youth by digitizing the local supply chain.",
    image: "https://engagewithscience.org/wp-content/uploads/2021/04/IMG_8934-2048x1536.jpg",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="bg-green-50 py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Success Stories
        </h2>
        <p className="text-green-700 max-w-2xl mx-auto">
          Discover how our marketplace is transforming local farming communities
          with sustainable digital solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {caseStudies.map((study, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-green-200"
          >
            <img
              src={study.image}
              alt={study.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">
                {study.title}
              </h3>
              <p className="text-green-700 text-sm">{study.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
