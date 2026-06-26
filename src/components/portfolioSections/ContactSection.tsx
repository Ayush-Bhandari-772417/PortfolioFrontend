// frontend2\src\components\portfolioSections\ContactSection.tsx
'use client';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';
import { useState, useCallback } from 'react';
import Script from 'next/script';
import { AllSettings } from '@/types';
import { useRecaptcha } from '@/hooks/useRecaptcha';

export default function ContactSection({ settings }: { settings: AllSettings }) {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [scriptEnabled, setScriptEnabled] = useState(false);
  const { loaded: recaptchaLoaded, error: recaptchaError, onScriptLoad, onScriptError, execute, resetToken } = useRecaptcha('contact');

  // Lazy load reCAPTCHA when user interacts with form fields
  const handleFieldFocus = useCallback(() => {
    setScriptEnabled(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Get reCAPTCHA token if available
      let token = null;
      if (!recaptchaError) {
        token = await execute();
        if (!token && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
          // reCAPTCHA failed but site key exists
          setStatus('error');
          setErrorMessage('Security verification failed. Please try again.');
          setTimeout(() => {
            setStatus('idle');
            setErrorMessage('');
          }, 5000);
          return;
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', message: '' });
        resetToken();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');

        if (response.status === 429) {
          setErrorMessage('Too many requests. Please try again later.');
        } else if (data.error) {
          setErrorMessage(data.error);
        } else if (data.email || data.message) {
          const errorMsg = data.email || data.message;
          setErrorMessage(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
        } else {
          setErrorMessage('Failed to send message. Please try again.');
        }

        resetToken();
        setTimeout(() => {
          setStatus('idle');
          setErrorMessage('');
        }, 5000);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection.');
      resetToken();
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#F4FBFF] via-white to-[#E6F6FE] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A6FB]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#003554]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] via-[#0582CA] to-[#003554]">Touch</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Have a project in mind? Let's create something amazing together!</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-[#006494]/10 border border-[#00A6FB]/15 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-3xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-[#00A6FB] to-[#006494] bg-clip-text text-transparent">
                Contact Information
              </h3>
              
              <div className="space-y-5">
                {/* Email */}
                <a
                  href={`mailto:${settings.settings.email || 'hello@example.com'}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#00A6FB]/10 to-[#0582CA]/10 hover:from-[#00A6FB]/15 hover:to-[#0582CA]/15 transition-all duration-300 group cursor-pointer border border-[#00A6FB]/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#00A6FB] to-[#0582CA] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#006494] uppercase tracking-wide">Email</div>
                    <div className="text-lg font-bold text-slate-900 group-hover:text-[#006494] transition-colors">
                      {settings.settings.email || 'hello@example.com'}
                    </div>
                  </div>
                  <div className="text-[#0582CA] group-hover:translate-x-1 transition-transform">-&gt;</div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${settings.settings.phone || '+15551234567'}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#0582CA]/10 to-[#006494]/10 hover:from-[#0582CA]/15 hover:to-[#006494]/15 transition-all duration-300 group cursor-pointer border border-[#0582CA]/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#0582CA] to-[#006494] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#006494] uppercase tracking-wide">Phone</div>
                    <div className="text-lg font-bold text-slate-900 group-hover:text-[#006494] transition-colors">
                      {settings.settings.phone || '+1 (555) 123-4567'}
                    </div>
                  </div>
                  <div className="text-[#0582CA] group-hover:translate-x-1 transition-transform">-&gt;</div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#006494]/10 to-[#003554]/10 border border-[#006494]/20">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#006494] to-[#003554] rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#006494] uppercase tracking-wide">Location</div>
                    <div className="text-lg font-bold text-slate-900">
                      {settings.settings.location || 'San Francisco, CA'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="bg-gradient-to-r from-[#006494] to-[#003554] rounded-2xl p-6 text-white shadow-xl shadow-[#003554]/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-bold text-lg">Quick Response</span>
              </div>
              <p className="text-[#E6F6FE]">I typically respond within 24 hours during business days.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slideInRight">
            <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-[#006494]/10 border border-[#00A6FB]/15">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={handleFieldFocus}
                    disabled={status === 'loading'}
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-[#00A6FB] focus:ring-4 focus:ring-[#00A6FB]/15 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 placeholder-slate-400"
                    placeholder="your@email.com"
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={handleFieldFocus}
                    disabled={status === 'loading'}
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-[#00A6FB] focus:ring-4 focus:ring-[#00A6FB]/15 focus:outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 placeholder-slate-400"
                    placeholder="Tell me about your project, ideas, or questions..."
                    suppressHydrationWarning
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading' || !formData.email || !formData.message || !recaptchaLoaded || recaptchaError}
                  className="w-full px-8 py-5 rounded-xl bg-gradient-to-r from-[#00A6FB] via-[#0582CA] to-[#006494] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#006494]/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0582CA] via-[#006494] to-[#003554] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {status === 'loading' ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        <span>Message Sent!</span>
                      </>
                    ) : status === 'error' ? (
                      <>
                        <XCircle className="w-6 h-6" />
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Success Message */}
                {status === 'success' && (
                  <div className="p-5 bg-gradient-to-r from-[#00A6FB]/10 to-[#0582CA]/10 border-2 border-[#00A6FB]/25 rounded-xl animate-fadeIn">
                    <p className="text-[#006494] text-center font-bold flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {status === 'error' && errorMessage && (
                  <div className="p-5 bg-gradient-to-r from-[#051923]/5 to-[#003554]/10 border-2 border-[#003554]/25 rounded-xl animate-fadeIn">
                    <p className="text-[#003554] text-center font-bold flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      {errorMessage}
                    </p>
                  </div>
                )}

                {/* reCAPTCHA Notice */}
                <p className="text-xs text-slate-500 text-center">
                  Protected by reCAPTCHA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Only injected after user focuses the field — but via next/script, not DOM manipulation */}
    {scriptEnabled && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
        onLoad={onScriptLoad}
        onError={onScriptError}
      />
    )}
    </section>
  );
}
