import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Training",
    questions: [
      {
        q: "How many sessions per week do I need?",
        a: "Most clients see great results with 3 sessions per week. For in-person and online live programs, we schedule 12 sessions per month. The key is consistency over intensity — we design programs that fit your schedule, not the other way around.",
      },
      {
        q: "Do I need a gym membership or equipment?",
        a: "Not necessarily. For in-person training, I can work with you at home or in a gym. For online coaching, we design workouts based on what you have available — whether that's a full gym, basic dumbbells, or just bodyweight. We adapt to your situation.",
      },
      {
        q: "What if I've never worked out before?",
        a: "That's completely fine. Many of my clients started with zero gym experience. We begin with fundamentals, focus on proper form, and progressively build your strength and confidence. No judgment, just structured guidance.",
      },
    ],
  },
  {
    category: "Diet & Nutrition",
    questions: [
      {
        q: "Will I have to follow a strict diet?",
        a: "No crash diets or extreme restrictions. I believe in sustainable nutrition that fits your lifestyle, culture, and preferences. We make gradual adjustments that you can maintain long-term, not short-term fixes that lead to rebound.",
      },
      {
        q: "Do you provide meal plans?",
        a: "Yes, all programs include personalized diet guidance. For online programs, you get a lifestyle-friendly plan with alternatives. For live coaching, we do active tracking and adjust based on your progress and feedback.",
      },
      {
        q: "Can you work with vegetarian/vegan diets?",
        a: "Absolutely. I work with clients across all dietary preferences — vegetarian, vegan, eggetarian, and non-vegetarian. We ensure you hit your protein and nutrition goals regardless of your food choices.",
      },
    ],
  },
  {
    category: "Program Expectations",
    questions: [
      {
        q: "How soon will I see results?",
        a: "Most clients notice changes in energy and strength within 2-3 weeks. Visible body composition changes typically appear by week 6-8 with consistent effort. Sustainable transformation takes 3-6 months — we're building habits, not quick fixes.",
      },
      {
        q: "What happens if I miss a session or travel?",
        a: "Life happens. For in-person clients, we reschedule within the month. For online clients, sessions are flexible across timezones. During travel, I provide modified workouts you can do anywhere. The goal is progress, not perfection.",
      },
      {
        q: "What's included in the free assessment?",
        a: "The free assessment is a no-pressure conversation where we discuss your goals, current lifestyle, any injuries or limitations, and which program might suit you best. It's about understanding if we're a good fit to work together.",
      },
    ],
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 lg:py-32 bg-secondary/30">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Common Questions
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know before starting your fitness journey.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="card-elevated"
            >
              <h3 className="font-display text-lg font-semibold mb-4 text-primary">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium hover:text-primary hover:no-underline py-3">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
