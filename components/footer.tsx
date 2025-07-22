import Link from "next/link"
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Broka256</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Uganda's premier property platform connecting buyers, sellers, and brokers with verified listings, live
              chat, and secure transactions across all districts.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/properties/add" className="text-gray-300 hover:text-white">
                  List Property
                </Link>
              </li>
              <li>
                <Link href="/brokers" className="text-gray-300 hover:text-white">
                  Find Brokers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-300">+256 700 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-300">info@broka256.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Plot 123, Kampala Road
                  <br />
                  Kampala, Uganda
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Broka256. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white text-sm">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
