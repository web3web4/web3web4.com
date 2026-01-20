import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ArrowRight, Send } from 'lucide-react';
import { toast } from 'sonner';
import { socialLinks } from '../../data/mock';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);

    const toEmail = socialLinks.email;
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const canUseEmailJS = Boolean(serviceId && templateId && publicKey);

    try {
      if (canUseEmailJS) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: toEmail,
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message,
          },
          {
            publicKey,
          }
        );
        toast.success("Message sent successfully!");
      } else {
        const subject = `New contact message from ${formData.name}`;
        const body = `From: ${formData.name} <${formData.email}>\n\n${formData.message}`;
        const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        toast.success('Opening your email app to send the message');
      }
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FFD1]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Info */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] text-sm font-medium mb-6">
              GET IN TOUCH
            </span>
            <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Connect With Us
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              Ready to bring your Web3 or AI vision to life? Let's discuss your project 
              and explore how we can collaborate.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00FFD1]/10 flex items-center justify-center">
                  <span className="text-[#00FFD1] font-pixel text-sm">WWW</span>
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-1">Website</p>
                  <a
                    href="https://web3web4.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00FFD1] hover:underline"
                  >
                    web3web4.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="relative bg-[#121212] border border-white/10 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Your Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-black/50 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-[#00FFD1] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-black/50 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-[#00FFD1] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Your Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    className="bg-black/50 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-[#00FFD1] transition-colors resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] px-8 py-6 rounded-none text-lg font-medium transition-all duration-400 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-3">
                    {submitting ? 'Sending…' : 'Send Message'}
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </form>

              {/* Decorative Corners */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00FFD1]" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#00FFD1]" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#00FFD1]" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#00FFD1]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
