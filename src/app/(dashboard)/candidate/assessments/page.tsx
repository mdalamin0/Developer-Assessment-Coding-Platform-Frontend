"use client";

import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";



import CandidateAssessmentCard from "@/features/assessments/components/candidate/candidate-assessment-card";
import SectionHeader from "@/components/shared/dashboard/section-header";
import DataSearch from "@/components/shared/dashboard/data-search";
import StatusTabs from "@/components/shared/dashboard/status-tabs";
import EmptyState from "@/components/shared/dashboard/empty-state";
import TablePagination from "@/components/shared/dashboard/table-pagination";

type AssessmentStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

type InvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";

interface AssessmentInvitation {
  id: string;
  status: InvitationStatus;
  invitedAt: string;
  expiresAt: string;
}

interface Assessment {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  status: AssessmentStatus;
  startAt: string;
  endAt: string;
  recruiter: {
    companyName: string;
    designation: string;
    user: {
      name: string;
    };
  };
  invitations: AssessmentInvitation[];
}

const assessments: Assessment[] = [
  {
    id: "assessment-1",
    title: "Frontend Developer Assessment",
    description:
      "Evaluate your frontend development skills with practical questions and real-world scenarios.",
    duration: 60,
    totalMarks: 100,
    passingMarks: 60,
    status: "PUBLISHED",
    startAt: "2026-09-22T09:00:00.000Z",
    endAt: "2026-09-25T18:00:00.000Z",
    recruiter: {
      companyName: "TechNova Solutions",
      designation: "Senior Technical Recruiter",
      user: {
        name: "Sarah Ahmed",
      },
    },
    invitations: [
      {
        id: "invitation-1",
        status: "PENDING",
        invitedAt: "2026-09-21T10:00:00.000Z",
        expiresAt: "2026-09-25T18:00:00.000Z",
      },
    ],
  },
  {
    id: "assessment-2",
    title: "JavaScript Fundamentals",
    description:
      "Test your understanding of modern JavaScript concepts, ES6+, asynchronous programming, and best practices.",
    duration: 45,
    totalMarks: 80,
    passingMarks: 50,
    status: "PUBLISHED",
    startAt: "2026-09-20T09:00:00.000Z",
    endAt: "2026-09-28T18:00:00.000Z",
    recruiter: {
      companyName: "CodeCraft Ltd.",
      designation: "Talent Acquisition Manager",
      user: {
        name: "Michael Smith",
      },
    },
    invitations: [
      {
        id: "invitation-2",
        status: "ACCEPTED",
        invitedAt: "2026-09-19T11:30:00.000Z",
        expiresAt: "2026-09-28T18:00:00.000Z",
      },
    ],
  },
  {
    id: "assessment-3",
    title: "Backend Engineering Assessment",
    description:
      "Evaluate your knowledge of REST APIs, databases, authentication, backend architecture, and security.",
    duration: 75,
    totalMarks: 120,
    passingMarks: 75,
    status: "PUBLISHED",
    startAt: "2026-09-15T09:00:00.000Z",
    endAt: "2026-09-30T18:00:00.000Z",
    recruiter: {
      companyName: "CloudBridge Technologies",
      designation: "Engineering Recruiter",
      user: {
        name: "Daniel Wilson",
      },
    },
    invitations: [
      {
        id: "invitation-3",
        status: "ACCEPTED",
        invitedAt: "2026-09-14T08:45:00.000Z",
        expiresAt: "2026-09-30T18:00:00.000Z",
      },
    ],
  },
  {
    id: "assessment-4",
    title: "TypeScript Developer Assessment",
    description:
      "Assess your TypeScript knowledge including types, generics, utility types, and advanced patterns.",
    duration: 50,
    totalMarks: 100,
    passingMarks: 65,
    status: "PUBLISHED",
    startAt: "2026-09-12T09:00:00.000Z",
    endAt: "2026-09-26T18:00:00.000Z",
    recruiter: {
      companyName: "DevCore Inc.",
      designation: "Technical Recruiter",
      user: {
        name: "Emily Johnson",
      },
    },
    invitations: [
      {
        id: "invitation-4",
        status: "PENDING",
        invitedAt: "2026-09-11T14:00:00.000Z",
        expiresAt: "2026-09-26T18:00:00.000Z",
      },
    ],
  },
  {
    id: "assessment-5",
    title: "React Development Assessment",
    description:
      "Test your practical knowledge of React components, hooks, state management, and application architecture.",
    duration: 60,
    totalMarks: 100,
    passingMarks: 60,
    status: "CLOSED",
    startAt: "2026-09-05T09:00:00.000Z",
    endAt: "2026-09-15T18:00:00.000Z",
    recruiter: {
      companyName: "PixelWorks",
      designation: "Hiring Manager",
      user: {
        name: "James Anderson",
      },
    },
    invitations: [
      {
        id: "invitation-5",
        status: "EXPIRED",
        invitedAt: "2026-09-04T10:00:00.000Z",
        expiresAt: "2026-09-15T18:00:00.000Z",
      },
    ],
  },
];

const statusTabs = [
  { value: "ALL", label: "All" },
  { value: "PUBLISHED", label: "Published" },
  { value: "CLOSED", label: "Closed" },
  { value: "DRAFT", label: "Draft" },
];

const CandidateAssessmentPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);

  const filteredAssessments = useMemo(() => {
    return assessments.filter((assessment) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        assessment.title.toLowerCase().includes(searchValue) ||
        assessment.description?.toLowerCase().includes(searchValue) ||
        assessment.recruiter.companyName.toLowerCase().includes(searchValue);

      const matchesStatus = status === "ALL" || assessment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="container-app page-section">
      <SectionHeader
        title="My Assessments"
        description="View and manage the assessments assigned to you."
      />

      <div className="mt-6 space-y-6">
        {/* Search & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <DataSearch
            value={search}
            onChange={handleSearchChange}
            placeholder="Search assessments..."
          />

          <StatusTabs
            value={status}
            onValueChange={handleStatusChange}
            items={statusTabs}
          />
        </div>

        {/* Results */}
        {filteredAssessments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredAssessments.map((assessment) => (
              <CandidateAssessmentCard
                key={assessment.id}
                id={assessment.id}
                title={assessment.title}
                description={assessment.description}
                duration={assessment.duration}
                totalMarks={assessment.totalMarks}
                passingMarks={assessment.passingMarks}
                status={assessment.status}
                startAt={assessment.startAt}
                endAt={assessment.endAt}
                recruiter={assessment.recruiter}
                invitations={assessment.invitations}
              />
            ))}
          </div>
        ) : (
          <div className="app-card">
            <EmptyState
              icon={ClipboardList}
              title="No assessments found"
              description={
                search || status !== "ALL"
                  ? "No assessments match your current search or filter."
                  : "You don't have any assessments assigned to you yet."
              }
            />
          </div>
        )}

        {/* Pagination */}
        {filteredAssessments.length > 0 && (
          <div className="flex justify-center pt-2">
            <TablePagination
              totalPages={3}
              page={page}
              handlePageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateAssessmentPage;
