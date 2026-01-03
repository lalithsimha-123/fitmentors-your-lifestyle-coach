import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, MapPin, Globe, Star, Clock } from "lucide-react";

const programs = [
  {
    name: "In-Person Coaching",
    location: "Bangalore Only",
    price: "₹15,000",
    period: "month",
    bestFor: "People who want hands-on correction and maximum accountability",
    icon: MapPin,
    features: [
      "12 coached sessions per month",
      "Personalized diet plan + monitoring",
      "Alternate-day workout programming",
      "Home or gym sessions",
      "Posture correction",
    ],
    note: "Serving: South Bangalore • Koramangala • HSR",
    badge: "Limited monthly slots",
    cta: "Book Free Assessment",
    featured: false,
  },
  {
    name: "Online Live Training",
    location: "Global",
    price: "₹12,000",
    period: "month",
    bestFor: "Busy professionals who want real-time coaching from anywhere",
    icon: Globe,
    features: [
      "12 live online sessions",
      "Diet planning + tracking",
      "Posture correction (live feedback)",
      "Progress tracking & smart goal setting",
      "Alternate-day workout plan",
    ],
    note: "Timezone-friendly • Global availability",
    badge: null,
    cta: "Start Online Coaching",
    featured: false,
  },
  {
    name: "3-Month Lifestyle Reset",
    location: "Online",
    price: "₹12,000",
    period: "3 months",
    bestFor: "Sustainable fat loss or strength without live sessions",
    icon: Clock,
    features: [
      "Body-type-based training plan",
      "Lifestyle-friendly diet plan",
      "Daily progress tracking",
      "WhatsApp / Email support",
      "Workout reference videos",
    ],
    note: "Recommended minimum commitment",
    badge: null,
    cta: "Apply for Coaching",
    featured: false,
  },
  {
    name: "6-Month Transformation",
    location: "Online",
    price: "₹22,000",
    period: "6 months",
    bestFor: "Long-term goals, habit building, consistency",
    icon: Star,
    features: [
      "Fully customized workout plan",
      "Customized diet based on lifestyle",
      "Daily accountability tracking",
      "WhatsApp / Email support",
      "Global availability",
    ],
    note: null,
    badge: "Most Popular",
    cta: "Start Long-Term Coaching",
    featured: true,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="programs" className="py-24 lg:py-32">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Programs & Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Choose Your Coaching Package
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every program is outcome-focused. Pick what fits your lifestyle, not the other way around.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 ${
                program.featured
                  ? "bg-gradient-to-b from-primary/10 to-card border-primary/50 shadow-lg glow-accent"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              {/* Badge */}
              {program.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${
                  program.featured
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground border border-border"
                }`}>
                  {program.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                program.featured ? "bg-primary/20" : "bg-secondary"
              }`}>
                <program.icon className={`w-6 h-6 ${program.featured ? "text-primary" : "text-muted-foreground"}`} />
              </div>

              {/* Name & Location */}
              <h3 className="font-display text-xl font-bold mb-1">{program.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{program.location}</p>

              {/* Price */}
              <div className="mb-4">
                <span className="font-display text-3xl font-bold">{program.price}</span>
                <span className="text-muted-foreground text-sm"> / {program.period}</span>
              </div>

              {/* Best For */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                <span className="text-foreground font-medium">Best for: </span>
                {program.bestFor}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Note */}
              {program.note && (
                <p className="text-xs text-muted-foreground mb-6 pb-6 border-b border-border">
                  {program.note}
                </p>
              )}

              {/* CTA */}
              <button
                onClick={scrollToForm}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  program.featured
                    ? "btn-primary"
                    : "bg-secondary hover:bg-muted text-foreground"
                }`}
              >
                {program.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
