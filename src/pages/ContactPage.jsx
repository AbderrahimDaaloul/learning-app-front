import React from "react";
import devPhoto from "../assets/daaloul.jpg";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const CONTACTS = {
  devEmail: "dev@example.com",
  supportEmail: "support@example.com",
  location: "Tunis, Tunisia",
  phone: "+216 12 345 678",
  phone2: "+216 98 765 432",
  socials: [
    { icon: <FaFacebook />, url: "https://facebook.com", color: "text-blue-600" },
    { icon: <FaInstagram />, url: "https://instagram.com", color: "text-pink-600" },
    { icon: <FaLinkedin />, url: "https://linkedin.com", color: "text-blue-400" },
    // { icon: <FaWhatsapp />, url: "https://wa.me", color: "text-green-500" }
  ]
};

const ContactPage = () => {
return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-lg">
                    Get in Touch
                </h1>
                <p className="mt-5 text-2xl text-gray-600 font-light">
                    We'd love to hear from you
                </p>
            </div>

            <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Contact Info */}
                    <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 p-12 text-white flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col items-center mb-10">
                                <img 
                                    src={devPhoto} 
                                    alt="Developer" 
                                    className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl mb-6 ring-4 ring-indigo-400"
                                />
                                <h2 className="text-3xl font-bold mb-2 tracking-wide">Contact Information</h2>
                                <p className="text-indigo-100 text-lg">Fill up the form and our team will get back to you</p>
                            </div>

                            <div className="space-y-8 flex flex-col justify-center">
                                {/* Address */}
                                <div className="flex items-center gap-5">
                                    <FaMapMarkerAlt className="h-7 w-7 text-indigo-200" />
                                    <div>
                                        <span className="block text-lg font-semibold">Address</span>
                                        <span className="text-indigo-100">{CONTACTS.location}</span>
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className="flex items-center gap-5">
                                    <FaPhone className="h-7 w-7 text-indigo-200" />
                                    <div>
                                        <span className="block text-lg font-semibold">Phone</span>
                                        <span className="text-indigo-100 block"><a href={`tel:${CONTACTS.phone}`} className="hover:underline">{CONTACTS.phone}</a></span>
                                        <span className="text-indigo-100 block"><a href={`tel:${CONTACTS.phone2}`} className="hover:underline">{CONTACTS.phone2}</a></span>
                                    </div>
                                </div>
                                {/* Developer Email */}
                                <div className="flex items-center gap-5">
                                    <FaEnvelope className="h-7 w-7 text-indigo-200" />
                                    <div>
                                        <span className="block text-lg font-semibold">Developer Email</span>
                                        <span className="text-indigo-100 block"><a href={`mailto:${CONTACTS.devEmail}`} className="hover:underline">{CONTACTS.devEmail}</a></span>
                                    </div>
                                </div>
                                {/* Support Email */}
                                <div className="flex items-center gap-5">
                                    <FaEnvelope className="h-7 w-7 text-indigo-200" />
                                    <div>
                                        <span className="block text-lg font-semibold">Support Email</span>
                                        <span className="text-indigo-100 block"><a href={`mailto:${CONTACTS.supportEmail}`} className="hover:underline">{CONTACTS.supportEmail}</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center space-x-7">
                            {CONTACTS.socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${social.color} hover:scale-110 hover:bg-white/10 p-3 rounded-full text-3xl transition-all duration-200 shadow-md`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="p-12 bg-white flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a message</h2>
                        <form className="space-y-7">
                            <div>
                                <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-lg"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-lg"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-1">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-lg"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default ContactPage;