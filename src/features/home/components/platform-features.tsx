import SectionBadge from "@/components/shared/section-badge";
import {
  BarChart3,
  BookOpenCheck,
  ClipboardList,
  Clock3,
  Layers3,
  Send,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Assessment Builder",
    description:
      "Create structured assessments with coding, MCQ, and written questions tailored to your hiring needs.",
  },
  {
    icon: BookOpenCheck,
    title: "Question Library",
    description:
      "Organize and reuse questions from your problem bank to build assessments faster and more efficiently.",
  },
  {
    icon: Send,
    title: "Candidate Invitations",
    description:
      "Invite candidates securely and give the right people access to the right assessment.",
  },
  {
    icon: Clock3,
    title: "Timed Assessments",
    description:
      "Set assessment durations and manage candidate attempts with a controlled testing experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Evaluation",
    description:
      "Manage submissions and evaluation workflows while keeping assessment data protected.",
  },
  {
    icon: BarChart3,
    title: "Results & Analytics",
    description:
      "Review scores, candidate performance, assessment history, and useful hiring insights.",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="page-section scroll-mt-24" id="features">
      <div className="container-app">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionBadge icon={Layers3} label="Platform Features" />

          <h2 className="section-title">
            Everything you need to run{" "}
            <span className="text-primary">better assessments</span>
          </h2>

          <p className="section-description mx-auto mt-4">
            A complete toolkit for creating, managing, evaluating, and analyzing
            developer assessments from one platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-6 h-1 w-8 rounded-full bg-primary/20 transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
