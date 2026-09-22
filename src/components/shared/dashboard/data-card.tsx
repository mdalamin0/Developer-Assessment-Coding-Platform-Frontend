import { ReactNode } from "react";

interface DataCardProps {
  children: ReactNode;
  className?: string;
}

const DataCard = ({ children, className = "" }: DataCardProps) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

interface DataCardHeaderProps {
  children: ReactNode;
  className?: string;
}

const DataCardHeader = ({ children, className = "" }: DataCardHeaderProps) => {
  return (
    <div
      className={`flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      {children}
    </div>
  );
};

interface DataCardContentProps {
  children: ReactNode;
  className?: string;
}

const DataCardContent = ({
  children,
  className = "",
}: DataCardContentProps) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export { DataCard, DataCardHeader, DataCardContent };
