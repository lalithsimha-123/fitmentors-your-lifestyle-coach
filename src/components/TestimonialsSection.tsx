import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, TrendingDown } from "lucide-react";
import jattepaImage from "@/assets/jattepa.avif";
import rohanImage from "@/assets/rohan.avif";
import jyothsnaImage from "@/assets/jyothsna.avif";

const testimonials = [
  {
    headline: "From unhealthy habits to feeling strong — physically and mentally",
    quote: "Years of poor lifestyle choices and erratic eating caused significant weight gain and low energy. Working with Rajath changed that. His constant check-ins on workouts and diet kept me accountable, and the progress felt sustainable — not forced. Today, I feel better both physically and mentally.",
    name: "Jattepa",
    location: "Bangalore",
    transformation: null,
    image: jattepaImage,
  },
  {
    headline: "141 kg to 95 kg — and still progressing",
    quote: "If motivation, flexibility, and a truly personal approach is what you're looking for, Rajath is the coach you want. Fitmentors runs professionally, and the support never drops. This isn't a short-term push — it's a system that works.",
    name: "Rohan K",
    location: "",
    transformation: "141 kg → 95 kg (ongoing)",
    image: rohanImage,
  },
  {
    headline: "Visible changes in weeks. Real transformation in months",
    quote: "Training with Rajath has been the best investment I've made in myself. Within weeks I noticed changes in strength and appearance, and within months others started noticing too. The structured approach helped me stay focused and consistent.",
    name: "Jyothsna Nayak",
    location: "",
    transformation: "96 kg → 68 kg",
    image: jyothsnaImage,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Real People. <span className="text-gradient">Real Results.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their transformation journey.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-elevated group hover:border-primary/30 transition-colors duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-primary/30" />
              </div>

              {/* Headline */}
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                {testimonial.headline}
              </h3>

              {/* Quote */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Transformation Badge */}
              {testimonial.transformation && (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 mb-6">
                  <TrendingDown className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.transformation}
                  </span>
                </div>
              )}

              {/* Author */}
              <div className="pt-6 border-t border-border flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  {testimonial.location && (
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
