import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, CheckCircle2 } from "lucide-react";
import rajathImage from "@/assets/rajath.avif";

const certifications = ["ACE", "ASCA", "ISSA", "GGU", "IFAA", "F45"];

const philosophyPoints = [
  "Sustainable fitness that fits real lifestyles",
  "No crash diets. No extreme routines",
  "Long-term consistency over short-term hacks",
  "Accountability and structure that works",
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30">
      <div className="section-container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image & Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent z-10" />
              <img
                src={rajathImage}
                alt="Rajath Simha - Founder of Fitmentors"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 md:right-6 bg-card border border-border rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold">10+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              Meet Your Coach
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Discipline Over <span className="text-gradient">Motivation</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              I'm Rajath Simha, and I've spent over a decade helping busy professionals 
              transform their bodies without sacrificing their careers or sanity. 
              My approach is simple: sustainable systems that create lasting change.
            </p>

            {/* Philosophy Points */}
            <div className="space-y-4 mb-8">
              {philosophyPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Certified by:</p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <motion.span
                    key={cert}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium"
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
