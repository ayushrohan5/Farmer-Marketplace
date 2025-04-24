import { motion } from "framer-motion";
import React from "react";
import Footer from "./Footer";

const Terms = () => {
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
          Terms & Conditions
        </h1>

        <p className="text-green-700 mb-6 text-center">
          Please read these terms and conditions carefully before using our services.
        </p>

        <div className="space-y-6 text-green-900 leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using our platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">2. Services</h2>
            <p>
              We provide a digital marketplace connecting farmers and consumers. We reserve the right to modify or discontinue the service at any time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">3. User Responsibilities</h2>
            <p>
              Users must provide accurate information, maintain the confidentiality of account credentials, and comply with all local laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">4. Prohibited Activities</h2>
            <p>
              You agree not to misuse the service, including spamming, impersonation, violating laws, or infringing intellectual property rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">5. Limitation of Liability</h2>
            <p>
              We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">6. Termination</h2>
            <p>
              We may suspend or terminate your access to the service at our discretion, without notice, for any conduct that violates these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be resolved in the courts located in Punjab, India.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">8. Contact</h2>
            <p>
              For any questions about these Terms & Conditions, reach out to us at: <br />
              <strong>Email:</strong> terms@farmermarket.com <br />
              <strong>Phone:</strong> +91 0000000000
            </p>
          </div>
        </div>
      </motion.div>
    </section>
   
    </>
  );
};

export default Terms;
