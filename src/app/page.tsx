import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="container-app page-section">
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-description">
              Manage your assessments and track candidate performance.
            </p>
          </div>

          <Button>Create Assessment</Button>
        </div>
      </div>
    </div>
  );
}
