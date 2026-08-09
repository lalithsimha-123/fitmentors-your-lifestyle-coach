import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

const metrics = [
  { icon: Users, value: 1000, suffix: "+", label: "Clients Trained" },
  { icon: Clock, value: 13, suffix: "+", label: "Years Experience" },
  { icon: TrendingUp, value: 95, suffix: "%", label: "Client Retention" },
  { icon: Award, value: 6, suffix: "", label: "Certifications" },
];

const CountUpNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
      {count}{suffix}
    </span>
  );
};

const SocialProofStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-secondary/50 border-y border-border">
      <div className="section-container">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="mb-2">
                <CountUpNumber value={metric.value} suffix={metric.suffix} inView={isInView} />
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofStrip;
