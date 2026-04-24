import React from 'react';
import { Award, Heart, UserCheck, Shield, ThumbsUp, Leaf, Users, Contact } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-16 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-600 py-20 px-4 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">About PetCare</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Dedicated to providing exceptional care and support for pets and their families since 2010.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            PetCare was established in 2010 with a vision to create a safe, loving, and professional environment for pets. 
            Founded by Dr. Sarah Johnson, a passionate veterinarian, PetCare started as a small clinic with a mission to 
            provide high-quality veterinary services to the local community.
          </p>
          <p className="text-gray-700 mb-4">
            Over the years, we have expanded our services to include grooming, training, boarding, and daycare, becoming a 
            one-stop solution for all pet care needs. Our team of dedicated professionals shares a common goal: to ensure 
            every pet receives the love, care, and attention they deserve.
          </p>
          <p className="text-gray-700">
            Today, PetCare is proud to serve thousands of pet families, offering state-of-the-art facilities and a wide 
            range of services tailored to meet the unique needs of every pet and their owner.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission & Values</h2>
          <p className="text-xl text-gray-700 mb-8">
            Our mission is to enhance the lives of pets and their families by providing exceptional care, education, and 
            compassion. We are committed to creating a community where pets thrive and owners feel supported.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={<Heart />} title="Compassion" />
            <ValueCard icon={<Award />} title="Excellence" />
            <ValueCard icon={<UserCheck />} title="Integrity" />
            <ValueCard icon={<Shield />} title="Safety" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose PetCare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={<ThumbsUp />} title="Experienced Team" />
            <FeatureCard icon={<Leaf />} title="Modern Facilities" />
            <FeatureCard icon={<Users />} title="Personalized Care" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial quote="PetCare has been a lifesaver for my dog, Max. Their grooming services are top-notch, and the staff is always kind and professional." author="Jennifer Smith" />
            <Testimonial quote="I've been bringing my cats to PetCare for years. Dr. Johnson and her team provide exceptional care and always take the time to explain everything thoroughly." author="Robert Chen" />
            <Testimonial quote="The training program at PetCare transformed my energetic puppy into a well-behaved companion. I can't recommend them enough!" author="Maria Lopez" />
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard= ({ icon, title }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
    <div className="text-teal-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
  </div>
);

const FeatureCard = ({ icon, title }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
    <div className="text-teal-600">{icon}</div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

const Testimonial= ({ quote, author }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <p className="text-gray-700 italic mb-4">"{quote}"</p>
    <p className="text-gray-800 font-bold">{author}</p>
  </div>
);

export default About;