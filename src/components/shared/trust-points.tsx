import { CheckCircle2 } from "lucide-react";

const trustPoints = [
  "Timed assessments",
  "Secure submissions",
  "Skill evaluation",
];

const TrustPoints = () => {
  return (
    <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground sm:text-sm">
      {trustPoints.map((point) => (
        <span key={point} className="flex items-center gap-2">
          <CheckCircle2 className="size-4 text-chart-3" />
          {point}
        </span>
      ))}
    </div>
  );
};

export default TrustPoints;