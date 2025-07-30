import React from 'react';

const testimonials = [
  {
    name: "Ali Raza",
    title: "Lahore-based Entrepreneur",
    review:
      "CarRental helped me list my Prado quickly. The process was smooth, and I now earn a steady side income without doing anything!"
  },
  {
    name: "Sana Malik",
    title: "Islamabad Content Creator",
    review:
      "I listed my Civic on CarRental and got my first booking within a week. It's a great platform for creators like me with flexible schedules."
  },
  {
    name: "Ahmed Khan",
    title: "Karachi Ride Provider",
    review:
      "I use CarRental to offer rides in my free time. The best part is they handle the customer verification and payments automatically!"
  }
];

const Testimonial = () => {
  return (
    <div className="bg-[#F9FAFB] px-4 py-14">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mb-10">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 p-6"
          >
            <div className="mb-3">
              <h3 className="text-lg font-medium text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-600">{testimonial.title}</p>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 22 20" fill="#FF532E" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.525.464a.5.5 0 01.95 0l2.107 6.482a.5.5 0 00.475.346h6.817a.5.5 0 01.294.904l-5.515 4.007a.5.5 0 00-.181.559l2.106 6.483a.5.5 0 01-.77.559l-5.514-4.007a.5.5 0 00-.588 0l-5.514 4.007a.5.5 0 01-.77-.56l2.106-6.482a.5.5 0 00-.181-.56L.832 8.197a.5.5 0 01.294-.904h6.817a.5.5 0 00.475-.346z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
