import React from 'react';
import teamPhoto1 from "../assets/education.jpg";
import teamPhoto2 from "../assets/educational-resources.jpg";
import founderPhoto from '../assets/daaloul.jpg'; // Reuse your existing image
import { FaLightbulb, FaHandsHelping, FaRocket, FaAward } from 'react-icons/fa';

const AboutPage = () => {
  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 py-24 px-4 text-white shadow-lg rounded-b-3xl">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">Our Story</h1>
          <p className="text-2xl max-w-2xl mx-auto opacity-90">
            Empowering learners through <span className="font-bold text-blue-200">innovative education</span> since 2025
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-indigo-800 mb-6">Who We Are</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Founded in Tunis, we're a passionate team of educators, technologists, and designers committed to revolutionizing learning experiences. What started as a small tutoring initiative has grown into a comprehensive e-learning platform serving thousands of students.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 text-indigo-600 bg-indigo-100 rounded-full p-2">
                  <FaLightbulb className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800">Our Vision</h3>
                  <p className="text-gray-600">To make quality education accessible to everyone, everywhere.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1 text-indigo-600 bg-indigo-100 rounded-full p-2">
                  <FaHandsHelping className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800">Our Mission</h3>
                  <p className="text-gray-600">To empower learners through personalized, engaging, and effective educational experiences.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <img 
              src={teamPhoto1} 
              alt="Team working" 
              className="rounded-2xl shadow-2xl h-64 w-full object-cover border-4 border-indigo-100"
            />
            <img 
              src={teamPhoto2} 
              alt="Online class" 
              className="rounded-2xl shadow-2xl h-64 w-full object-cover mt-8 border-4 border-indigo-100"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLightbulb className="h-8 w-8 text-indigo-600" />,
                title: "Innovation",
                description: "We constantly seek new ways to enhance learning experiences"
              },
              {
                icon: <FaHandsHelping className="h-8 w-8 text-indigo-600" />,
                title: "Integrity",
                description: "Honest and ethical in all our relationships"
              },
              {
                icon: <FaRocket className="h-8 w-8 text-indigo-600" />,
                title: "Excellence",
                description: "Committed to the highest standards in education"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Founders
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={founderPhoto} 
              alt="Founder" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
              <p className="text-indigo-600 mb-4">CEO & Founder</p>
              <p className="text-gray-600">
                Education specialist with 10+ years experience in curriculum development
              </p>
            </div>
          </div>
          {/* Add more team members similarly */}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Students", icon: <FaAward className="h-8 w-8" /> },
              { number: "500+", label: "Courses", icon: <FaAward className="h-8 w-8" /> },
              { number: "50+", label: "Educators", icon: <FaAward className="h-8 w-8" /> },
              { number: "98%", label: "Satisfaction", icon: <FaAward className="h-8 w-8" /> }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-indigo-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start learning?</h2>
          <p className="text-xl mb-8">
            Join thousands of students who are already transforming their lives
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;