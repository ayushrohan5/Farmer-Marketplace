import { motion } from "framer-motion";
import Footer from "./Footer";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
    <section className="min-h-screen bg-green-50 px-6 py-16 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-10 rounded-2xl shadow-xl border border-green-200 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-green-700 mb-6 text-center">
          Your privacy is important to us. This policy outlines how we collect, use, and safeguard your information.
        </p>

        <div className="space-y-6 text-green-900 leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">1. Information We Collect</h2>
            <p>
              We collect personal information such as your name, email address, and any other details you provide when you use our services or contact us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">2. How We Use Your Information</h2>
            <p>
              Your information is used to improve our services, respond to your queries, send updates, and ensure a personalized experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">3. Data Protection</h2>
            <p>
              We use robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">4. Third-Party Sharing</h2>
            <p>
              We do not sell or rent your personal information. We may share data with trusted partners to perform tasks on our behalf under strict confidentiality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">5. Your Choices</h2>
            <p>
              You can opt out of promotional emails at any time. You also have the right to access or request deletion of your data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">6. Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. Any changes will be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">7. Contact Us</h2>
            <p>
              If you have any questions or concerns about our privacy policy, please contact us at: <br />
              <strong>Email:</strong> privacy@farmermarket.com <br />
              <strong>Phone:</strong> +91 0000000000
            </p>
          </div>
        </div>
      </motion.div>
    </section>
    
    </>
  );
};

export default PrivacyPolicy;
