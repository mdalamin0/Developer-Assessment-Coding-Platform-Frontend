import CandidateAssessmentDetailsPage from "@/features/assessments/components/candidate/candidate-assessment-details-page";


interface CandidateAssessmentDetailsRouteProps {
  params: Promise<{
    assessmentId: string;
  }>;
}

const CandidateAssessmentDetailsRoute = async ({
  params,
}: CandidateAssessmentDetailsRouteProps) => {
  const { assessmentId } = await params;

  return <CandidateAssessmentDetailsPage id={assessmentId} />;
};

export default CandidateAssessmentDetailsRoute;
