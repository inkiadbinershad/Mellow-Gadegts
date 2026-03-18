import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import GlareHover from '../components/ui/GlareHover'
import ClickSpark from '../components/ui/ClickSpark'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Our Location',
    lines: ['Level 4, Gulshan Tower', 'Gulshan 2, Dhaka 1212', 'Bangladesh'],
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/15',
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+880 1XXX-XXXXXX', '+880 1XXX-XXXXXX', '(WhatsApp available)'],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/15',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['hello@mellowgadgets.com', 'support@mellowgadgets.com'],
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/15',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Sat – Thu: 10AM – 9PM', 'Friday: 2PM – 9PM'],
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/15',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="relative border-b border-white/[0.07] py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="section-container relative text-center">
          <span className="badge-blue mb-4">Get in Touch</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            Have a question about a product, order, or just want to say hello?
            We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="section-container py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map(({ icon: Icon, title, lines, color, bg }) => (
            <GlareHover
              key={title}
              borderRadius="16px"
              glareColor="#60a5fa"
              glareOpacity={0.2}
              glareSize={280}
              transitionDuration={800}
            >
              <div className={`rounded-2xl border ${bg} p-5 h-full`}>
                <div className={`w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center mb-4`}>
                  <Icon size={18} className={color} />
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-2">{title}</h3>
                {lines.map((line, i) => (
                  <p key={i} className="text-white/45 text-xs leading-relaxed">{line}</p>
                ))}
              </div>
            </GlareHover>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="font-display font-bold text-2xl text-white mb-6">Send a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={30} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-white/45 text-sm">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="btn-outline mt-6 text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Rafiq Ahmed"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Order inquiry, product question..."
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="input-field resize-none"
                    />
                  </div>

                  <ClickSpark sparkColor="#60a5fa" sparkSize={10} sparkRadius={20} sparkCount={9} duration={500}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-2.5 text-base"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </ClickSpark>
                </form>
              )}
            </div>
          </div>

          {/* Map / Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Map placeholder */}
            <div className="glass-card rounded-2xl overflow-hidden h-64 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6">
                <MapPin size={32} className="text-blue-400" />
                <p className="text-white/60 font-medium text-sm">Gulshan 2, Dhaka 1212</p>
                <p className="text-white/30 text-xs">Bangladesh</p>
                <a
                  href="https://goo.gl/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs py-2 px-4 mt-1"
                >
                  Open in Maps
                </a>
              </div>
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />
            </div>

            {/* FAQ quick links */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold text-white mb-4">Quick Help</h3>
              <div className="space-y-2.5">
                {[
                  'How do I track my order?',
                  'What is your return policy?',
                  'Do you offer EMI?',
                  'How to claim warranty?',
                ].map(q => (
                  <button
                    key={q}
                    className="w-full text-left text-white/50 hover:text-blue-300 text-sm py-2 border-b border-white/[0.05] last:border-none flex items-center justify-between group transition-colors"
                  >
                    {q}
                    <span className="text-white/20 group-hover:text-blue-400 transition-colors text-lg leading-none">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
