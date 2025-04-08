import React from "react";
import { Award, MapPin, Users, Clock } from "lucide-react";
import banner from "../assets/banner.jpg"
import mengeang from "../assets/mengeang.png";
import panha from "../assets/panha.png";
import chealean from "../assets/chealean.png";
import court from "../assets/about-court.jpg"

export default function About() {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-yellow-400" />,
      number: "10,000+",
      label: "Players Served",
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-400" />,
      number: "15+",
      label: "Years of Experience",
    },
    {
      icon: <MapPin className="h-8 w-8 text-yellow-400" />,
      number: "5",
      label: "Professional Courts",
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-400" />,
      number: "364",
      label: "Days Open/Year",
    },
  ];

  const team = [
    {
      id: 1,
      name: "Eng Mengeang",
      role: "Founder & Head Coach",
      bio: "Former national champion with over 20 years of playing and coaching experience.",
      image: mengeang,
    },
    {
      id: 2,
      name: "Both Chealean",
      role: "Professional Coach",
      bio: "International player with expertise in doubles strategy and technical training.",
      image: chealean,
    },
    {
      id: 3,
      name: "Chheang Sovanpanha",
      role: "Youth Program Director",
      bio: "Specialized in developing young talent through structured training programs.",
      image: panha,
    },
  ];

  return (
    <main className="min-h-screen bg-[#1e2535] pb-16">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={banner}
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">About Us</h1>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-12 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <p className="text-white mb-4">
                Fair Play was founded in 2008 with a simple mission: to provide a world-class badminton facility where
                players of all levels could train, compete, and enjoy the sport we love.
              </p>
              <p className="text-white mb-4">
                What started as a small club with just two courts has grown into one of the premier badminton centers in
                the region, featuring five professional-grade courts, comprehensive coaching programs, and
                top-of-the-line equipment.
              </p>
              <p className="text-white">
                Our commitment to promoting fair play, sportsmanship, and technical excellence has helped thousands of
                players develop their skills and passion for the game.
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={court}
                alt="Our facility"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-[#2c3b5a] p-6 rounded-lg text-center">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-yellow-400 text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-white text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Our Team Section */}
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.id} className="bg-[#2c3b5a] rounded-lg overflow-hidden">
                <div className="relative h-64 w-full flex justify-center items-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="absolute inset-0 h-full justify-self-center object-top object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  <div className="text-yellow-400 text-sm mb-2">{member.role}</div>
                  <p className="text-gray-300 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}