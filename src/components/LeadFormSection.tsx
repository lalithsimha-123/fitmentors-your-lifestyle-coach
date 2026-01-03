import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Shield, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const goals = [
  { value: "fat-loss", label: "Fat Loss" },
  { value: "strength", label: "Build Strength" },
  { value: "lifestyle", label: "Lifestyle Change" },
  { value: "other", label: "Other" },
];

const LeadFormSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    whatsapp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.goal || !formData.whatsapp) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
try {
      const response = await fetch('/.netlify/functions/submitLead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      const data = await response.json();
      toast.success('Thanks! We\'ll reach out within 24 hours.');
      setFormData({ name: '', goal: '', whatsapp: '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-24 lg:py-32 bg-secondary/30">
      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              Get Started
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Your Free <span className="text-gradient">Fitness Assessment</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Take the first step towards a healthier you. Fill out the form and we'll connect 
              within 24 hours to discuss your goals.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Quick Response</p>
                  <p className="text-sm text-muted-foreground">We'll reach out within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">No Commitment</p>
                  <p className="text-sm text-muted-foreground">Free consultation, zero pressure</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Personalized Plan</p>
                  <p className="text-sm text-muted-foreground">Get a roadmap tailored to you</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="card-elevated">
              <h3 className="font-display text-xl font-bold mb-6">
                Start Your Transformation
              </h3>

              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Goal */}
              <div className="mb-4">
                <label htmlFor="goal" className="block text-sm font-medium mb-2">
                  Your Goal
                </label>
                <select
                  id="goal"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select your goal</option>
                  {goals.map((goal) => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* WhatsApp */}
              <div className="mb-6">
                <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Book Free Assessment
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Your information is secure and will never be shared.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
