import React from 'react'
import { Mail } from 'lucide-react' 
const Newsletter = () => {
  return (
    <div className="bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] text-white py-14 px-6 md:px-16 rounded-3xl shadow-xl max-w-6xl mx-4 md:mx-auto my-16 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <Mail className="w-8 h-8 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold">Stay in the Loop</h2>
          </div>
          <p className="text-white/90 max-w-md mx-auto md:mx-0">
            Join our newsletter to get exclusive car rental deals, new listings, and exciting news delivered to your inbox.
          </p>
        </div>

        {/* Input field */}
        <form className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-6 md:mt-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl w-full sm:w-[300px] text-black outline-none focus:ring-2 ring-white ring-offset-2 transition duration-300"
            required
          />
          <button
            type="submit"
            className="bg-white text-[#0558FE] px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter
