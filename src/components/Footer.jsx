import { Share2, MessageCircle, Heart, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "List Your Property", "Careers", "Press"]
  },
  {
    title: "Explore Nepal",
    links: ["Destinations", "Culture Guide", "Map Search", "Blog"]
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Safety Guidelines", "Accessibility"]
  }
];

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Namaste Stay</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Authentic Nepali hospitality, modern booking precision.
            </p>
            <p className="text-gray-400 text-xs">
              Connecting you to the heart of the Himalayas.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-red-500 hover:scale-110 transition-all">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-500 hover:scale-110 transition-all">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-500 hover:scale-110 transition-all">
                <Heart size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-500 hover:scale-110 transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4 border-b border-red-500 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-red-400 transition text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4 border-b border-red-500 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <Phone size={16} className="text-red-500 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">+977-1-4000000</p>
                  <p className="text-xs text-gray-500">24/7 Support</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Mail size={16} className="text-red-500 mt-1 shrink-0" />
                <p className="text-sm text-gray-400">help@namastestay.np</p>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-red-500 mt-1 shrink-0" />
                <p className="text-sm text-gray-400">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Namaste Stay Nepal. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-400">
              <a href="#" className="hover:text-red-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-red-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-red-400 transition">Cookie Policy</a>
            </div>
            <p className="text-sm font-semibold text-red-500">NPR - Nepali Rupee</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

