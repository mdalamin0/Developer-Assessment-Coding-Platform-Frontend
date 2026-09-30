import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface RecruiterPaymentErrorProps {
  onRetry: () => void;
}

const RecruiterPaymentError = ({ onRetry }: RecruiterPaymentErrorProps) => {
  return (
    <div className="app-card flex min-h-[280px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold sm:text-lg">
        Unable to load payment history
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        We couldn&apos;t load your payment history right now. Please try again
        in a moment.
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-5"
        onClick={onRetry}
      >
        <RefreshCw className="mr-2 size-4" />
        Try Again
      </Button>
    </div>
  );
};

export default RecruiterPaymentError;
