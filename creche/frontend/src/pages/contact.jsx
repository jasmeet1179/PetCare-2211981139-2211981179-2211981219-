import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const faqs = [
    {
      question: "What services does PetCare offer?",
      answer: "PetCare offers grooming, boarding, daycare, training, and veterinary services to ensure your pets receive the best care possible."
    },
    {
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment by calling us, filling out the contact form, or using our online booking system."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we offer 24/7 emergency veterinary services. Please call our emergency hotline for immediate assistance."
    },
    {
      question: "What are your rates?",
      answer: "Our rates vary depending on the service and your pet's needs. Contact us for a detailed quote."
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-600 py-20 px-4 text-center text-white">
      <h2 className="text-xl font-semibold mb-4 ">Contact Information</h2>
        <div className="space-y-2">
          <p><Phone className="inline-block mr-2" />(91+) 9015056679</p>
          <p><Mail className="inline-block mr-2" /> support@petcare.com</p>
          <p><MapPin className="inline-block mr-2" /> Chitkara University </p>
        </div>
        <div className="inline-block   ">
            <div className='flex space-x-4 mt-3'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube /></a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        {formSubmitted ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600">Thank You!</h2>
            <p>Your message has been sent successfully.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setFormSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* FAQs Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;