import SectionBadge from "@/components/shared/section-badge";
import { ArrowRight, ClipboardCheck, FilePlus2, Sparkles, UserPlus, Workflow } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Assessment",
    description:
      "Build customized assessments with coding, MCQ, and written questions.",
    icon: FilePlus2,
  },
  {
    number: "02",
    title: "Invite Candidates",
    description:
      "Invite selected candidates and give them secure access to the assessment.",
    icon: UserPlus,
  },
  {
    number: "03",
    title: "Assess & Submit",
    description:
      "Candidates complete their assessment within the defined time and submit their answers.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Evaluate & Review",
    description:
      "Evaluate submissions, view scores, and review candidate performance in one place.",
    icon: ClipboardCheck,
  },
];

export default function HowItWorks() {
  return (
    <section id="howItWorks" className="page-section overflow-hidden scroll-mt-24">
      <div className="container-app">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionBadge icon={Workflow} label="How It Works" />

          <h2 className="section-title">
            From assessment creation to{" "}
            <span className="text-primary">clear results</span>
          </h2>

          <p className="section-description mx-auto mt-4">
            DevAssess makes the assessment process simple, structured, and
            efficient for both recruiters and candidates.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-border lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="group relative text-center">
                  {/* Icon */}
                  <div className="relative z-10 mx-auto mb-6 flex size-24 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-md">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" strokeWidth={1.8} />
                    </div>

                    {/* Step Number */}
                    <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border border-border bg-background text-[11px] font-bold text-muted-foreground shadow-sm">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="px-2">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {step.number}
                    </p>

                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile/Tablet Arrow */}
                  {index < steps.length - 1 && (
                    <div className="mt-8 flex justify-center text-muted-foreground sm:hidden">
                      <ArrowRight className="size-5 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-muted/40 px-5 py-4 text-center sm:px-8">
          <p className="text-sm leading-6 text-muted-foreground">
            <span className="font-semibold text-foreground">
              One streamlined workflow.
            </span>{" "}
            Create assessments, connect with candidates, manage submissions, and
            make informed hiring decisions from one platform.
          </p>
        </div>
      </div>
    </section>
  );
}
