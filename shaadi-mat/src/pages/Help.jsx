import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaEnvelope, FaPhone, FaQuestionCircle } from "react-icons/fa";

const Help = () => {
  const faqs = [
    {
      question: "How do I register?",
      answer: "Click on the Register button on the top right corner, fill in your details, and you are good to go!"
    },
    {
      question: "Is it free to use?",
      answer: "Yes, basic registration is free. You can upgrade to Premium for exclusive features like contacting matches directly."
    },
    {
      question: "How can I delete my account?",
      answer: "You can go to your Settings page and find the option to deactivate or delete your account permanently."
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. We use top-notch encryption and security measures to ensure your personal data remains private and secure."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="w-full min-h-[100vh] bg-gray-50 py-10 px-5 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-600 mb-4 flex justify-center items-center gap-2">
            <FaQuestionCircle /> Help & Support
          </h1>
          <p className="text-gray-600">Have questions? We're here to help you every step of the way.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FaEnvelope size={24} />
              </div>
              <h3 className="text-xl font-semibold">Email Support</h3>
            </div>
            <p className="text-gray-600 mb-4">Drop us a line and we'll get back to you within 24 hours.</p>
            <a href="mailto:support@shaaditamil.com" className="text-blue-600 font-medium hover:underline">support@shaaditamil.com</a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FaPhone size={24} />
              </div>
              <h3 className="text-xl font-semibold">Call Us</h3>
            </div>
            <p className="text-gray-600 mb-4">Mon - Fri, 9:00 AM - 6:00 PM</p>
            <a href="tel:+911234567890" className="text-green-600 font-medium hover:underline">+91 123 456 7890</a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="font-medium text-gray-700">{faq.question}</span>
                  {openIndex === index ? <FaChevronUp className="text-pink-500" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-white text-gray-600 border-t border-gray-200 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Help;
