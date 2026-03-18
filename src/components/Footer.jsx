import { Link } from 'react-router-dom'
import { Zap, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react'
import LogoLoop from './ui/LogoLoop'

const gadgetIcons = [
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <path d="M24 10C17.373 10 12 15.373 12 22s5.373 12 12 12 12-5.373 12-12S30.627 10 24 10z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 36c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Headphones',
  },
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <rect x="9" y="15" width="30" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17 24h14M24 20v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Speakers',
  },
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <rect x="14" y="9" width="20" height="30" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="18" y="13" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1"/>
        <circle cx="24" cy="35" r="2" fill="currentColor"/>
      </svg>
    ),
    title: 'Smartphones',
  },
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="1"/>
        <path d="M24 12v3M24 33v3M12 24h3M33 24h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Smartwatches',
  },
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <rect x="7" y="12" width="30" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 36h16M21 32v4M27 32v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Monitors',
  },
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <rect x="7" y="14" width="34" height="22" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 36l-3 3h22l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="12" y="18" width="24" height="13" rx="2" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    title: 'Laptops',
  },
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <circle cx="24" cy="21" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 38c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Webcams',
  },
  {
    node: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[48px] h-[48px]">
        <rect width="48" height="48" rx="12" fill="rgba(37,99,235,0.12)"/>
        <path d="M14 32V21a10 10 0 1120 0v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="10" y="29" width="7" height="9" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="31" y="29" width="7" height="9" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Headsets',
  },
]

const footerLinks = {
  'Quick Links': [
    { label: 'Home',          path: '/' },
    { label: 'Shop',          path: '/shop' },
    { label: 'Deals & Offers', path: '/shop?filter=deals' },
    { label: 'New Arrivals',  path: '/shop?filter=new' },
    { label: 'Contact',       path: '/contact' },
  ],
  'Categories': [
    { label: 'Headphones',       path: '/shop?category=headphones' },
    { label: 'Bluetooth Speakers', path: '/shop?category=speakers' },
    { label: 'Smartwatches',     path: '/shop?category=watches' },
    { label: 'Accessories',      path: '/shop?category=accessories' },
    { label: 'Peripherals',      path: '/shop?category=peripherals' },
  ],
  'Support': [
    { label: 'FAQ',            path: '/faq' },
    { label: 'Track Order',    path: '/track' },
    { label: 'Return Policy',  path: '/returns' },
    { label: 'Warranty',       path: '/warranty' },
    { label: 'Privacy Policy', path: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-950 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/[0.04] rounded-full filter blur-[80px] pointer-events-none" />

      {/* ── Logo Loop — 20% bigger (logoHeight: 40 → 48) ── */}
      <div className="relative border-b border-white/[0.06] py-10">
        <p className="text-center text-white/30 text-xs font-medium uppercase tracking-widest mb-6">
          Gadget Categories We Cover
        </p>
        <LogoLoop
          logos={gadgetIcons}
          speed={50}
          direction="left"
          logoHeight={48}
          gap={48}
          pauseOnHover
          fadeOut
          fadeOutColor="#0f172a"
          scaleOnHover
          ariaLabel="Gadget categories"
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <div className="font-display font-bold text-xl">
                <span className="gradient-text">Mellow</span>
                <span className="text-white"> Gadgets</span>
              </div>
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Bangladesh's premium destination for cutting-edge gadgets and accessories.
              Genuine products, fast delivery, and exceptional after-sales support.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: MapPin, text: 'Gulshan 2, Dhaka 1212, Bangladesh' },
                { icon: Phone,  text: '+880 1XXX-XXXXXX' },
                { icon: Mail,   text: 'hello@mellowgadgets.com' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/45 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {[
                { icon: Facebook,  label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube,   label: 'YouTube' },
                { icon: Twitter,   label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-white/50 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/40 text-sm hover:text-blue-300 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative border-t border-white/[0.07]">
        <div className="section-container py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-semibold text-white text-base mb-1">Stay in the loop</h4>
              <p className="text-white/40 text-sm">Get deals and new arrivals straight to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="email" placeholder="your@email.com" className="input-field flex-1 sm:w-64" />
              <button className="btn-primary px-5 py-3 text-sm whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/[0.05]">
        <div className="section-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <p>© 2025 Mellow Gadgets. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/50 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
