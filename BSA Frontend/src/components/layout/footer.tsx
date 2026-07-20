import Link from "next/link";
import { Phone, Mail, MapPin, Shield, Gem, Truck, Lock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1510] text-gray-300 shadow-2xl shadow-black/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Column 1: About Satva Gold */}
          <div>
            <h3 className="text-[#c9a24a] text-sm font-bold mb-6 pb-2 border-b border-[#c9a24a]/30">
              ABOUT SATVA GOLD
            </h3>

            <div className="space-y-4 text-sm">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#c9a24a] flex-shrink-0 mt-1" />
                <p className="text-gray-400">
                  7-8-9, Ground Floor, Satkar Complex, CG Road, Ahmedabad.
                </p>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-[#c9a24a] flex-shrink-0 mt-1" />
                <a href="tel:+919974878332" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  +91 9974878332
                </a>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-[#c9a24a] flex-shrink-0 mt-1" />
                <a href="mailto:info@satvagold.com" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  info@satvagold.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-8 h-8 bg-[#c9a24a]/20 hover:bg-[#c9a24a] rounded-full transition-colors text-[#c9a24a] hover:text-white flex items-center justify-center text-sm font-bold" aria-label="Facebook" title="Facebook">
                f
              </a>
              <a href="#" className="w-8 h-8 bg-[#c9a24a]/20 hover:bg-[#c9a24a] rounded-full transition-colors text-[#c9a24a] hover:text-white flex items-center justify-center text-xs font-bold" aria-label="Instagram" title="Instagram">
                📷
              </a>
              <a href="#" className="w-8 h-8 bg-[#c9a24a]/20 hover:bg-[#c9a24a] rounded-full transition-colors text-[#c9a24a] hover:text-white flex items-center justify-center text-xs" aria-label="YouTube" title="YouTube">
                ▶
              </a>
              <a href="#" className="w-8 h-8 bg-[#c9a24a]/20 hover:bg-[#c9a24a] rounded-full transition-colors text-[#c9a24a] hover:text-white flex items-center justify-center text-sm font-bold" aria-label="Twitter" title="Twitter">
                𝕏
              </a>
            </div>

            {/* App Store Buttons */}
            <div className="flex gap-3 mt-6 flex-wrap">
              <a href="#" className="px-4 py-2 border border-[#c9a24a]/50 rounded-lg text-[#c9a24a] hover:bg-[#c9a24a]/10 transition-colors text-xs font-semibold flex items-center gap-2">
                <span>▶</span> GOOGLE PLAY
              </a>
              <a href="#" className="px-4 py-2 border border-[#c9a24a]/50 rounded-lg text-[#c9a24a] hover:bg-[#c9a24a]/10 transition-colors text-xs font-semibold flex items-center gap-2">
                <span>⧬</span> APP STORE
              </a>
            </div>
          </div>

          {/* Column 2: Information */}
          <div>
            <h3 className="text-[#c9a24a] text-sm font-bold mb-6 pb-2 border-b border-[#c9a24a]/30">
              INFORMATION
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  Shipping & Return
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Why Shop With Us */}
          <div>
            <h3 className="text-[#c9a24a] text-sm font-bold mb-6 pb-2 border-b border-[#c9a24a]/30">
              WHY SHOP WITH US
            </h3>

            <ul className="space-y-4 text-sm">
              {/* BIS Hallmarked */}
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-[#c9a24a] flex-shrink-0" />
                <div>
                  <p className="text-[#c9a24a] font-semibold">BIS Hallmarked</p>
                  <p className="text-gray-500 text-xs">Government-certified purity</p>
                </div>
              </li>

              {/* Certified Diamonds */}
              <li className="flex gap-3">
                <Gem className="w-5 h-5 text-[#c9a24a] flex-shrink-0" />
                <div>
                  <p className="text-[#c9a24a] font-semibold">Certified Diamonds</p>
                  <p className="text-gray-500 text-xs">IGI / GIA / SGL grading reports</p>
                </div>
              </li>

              {/* Free Shipping */}
              <li className="flex gap-3">
                <Truck className="w-5 h-5 text-[#c9a24a] flex-shrink-0" />
                <div>
                  <p className="text-[#c9a24a] font-semibold">Free Shipping</p>
                  <p className="text-gray-500 text-xs">Insured PAN INDIA delivery</p>
                </div>
              </li>

              {/* Secure Payment */}
              <li className="flex gap-3">
                <Lock className="w-5 h-5 text-[#c9a24a] flex-shrink-0" />
                <div>
                  <p className="text-[#c9a24a] font-semibold">Secure Payment</p>
                  <p className="text-gray-500 text-xs">256-bit SSL encryption</p>
                </div>
              </li>
            </ul>
          </div>

          
        </div>

        {/* Divider */}
        <div className="border-t border-[#c9a24a]/20 py-8 my-8" />

        {/* Most Ordered Cities */}
        <div className="mb-8">
          <h4 className="text-[#c9a24a] text-sm font-bold mb-4">MOST ORDERED CITIES:</h4>
          <div className="flex flex-wrap gap-2">
            {["Ahmedabad", "Delhi", "Bangalore", "Hyderabad", "Visakhapatnam", "Chennai"].map((city) => (
              <Link
                key={city}
                href="#"
                className="text-gray-400 hover:text-[#c9a24a] transition-colors text-sm"
              >
                {city} <span className="mx-1">•</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h4 className="text-[#c9a24a] text-sm font-bold mb-4">QUICK LINKS:</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
              BIS Certificate
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
              Shipping & Return
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
              Cancellation & Refund
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
              Sitemap
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="#" className="text-gray-400 hover:text-[#c9a24a] transition-colors">
              Today Gold Rate
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#c9a24a]/20 bg-[#0f0c0a] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-gray-500 text-sm">
            Copyright © {currentYear}{" "}
            <Link href="/" className="text-[#c9a24a] hover:text-white transition-colors">
              Satva Gold
            </Link>
            . All rights reserved. Made With{" "}
            <span className="text-red-500">❤</span> In India By{" "}
            <Link href="#" className="text-[#c9a24a] hover:text-white transition-colors font-semibold">
              Satva Gold
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
