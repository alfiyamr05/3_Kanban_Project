import { Board } from "../types/kanban";

export const seedBoard: Board = {
  columns: [
    {
      id: "col-1",
      title: "Backlog",
      cards: [
        {
          id: "card-1",
          title: "User authentication flow",
          details: "Design and implement login, registration, and password reset screens.",
        },
        {
          id: "card-2",
          title: "API rate limiting",
          details: "Add rate limiting middleware to prevent abuse on public endpoints.",
        },
        {
          id: "card-3",
          title: "Onboarding email sequence",
          details: "Write copy and set up automated welcome emails for new sign-ups.",
        },
      ],
    },
    {
      id: "col-2",
      title: "To Do",
      cards: [
        {
          id: "card-4",
          title: "Dashboard analytics widget",
          details: "Build a chart showing weekly active users pulled from the metrics API.",
        },
        {
          id: "card-5",
          title: "Mobile responsive nav",
          details: "Collapse the sidebar into a hamburger menu on screens below 768px.",
        },
      ],
    },
    {
      id: "col-3",
      title: "In Progress",
      cards: [
        {
          id: "card-6",
          title: "Notification system",
          details: "Real-time in-app notifications using WebSockets. Backend done, wiring up UI.",
        },
        {
          id: "card-7",
          title: "Dark mode support",
          details: "Add CSS variables and a toggle to switch between light and dark themes.",
        },
      ],
    },
    {
      id: "col-4",
      title: "Review",
      cards: [
        {
          id: "card-8",
          title: "CSV export feature",
          details: "Allow users to export their data table to a CSV file with one click.",
        },
        {
          id: "card-9",
          title: "Accessibility audit",
          details: "Run axe-core across all pages and fix critical WCAG 2.1 AA violations.",
        },
      ],
    },
    {
      id: "col-5",
      title: "Done",
      cards: [
        {
          id: "card-10",
          title: "Project scaffolding",
          details: "Initial repo setup, CI pipeline, linting, and base component library.",
        },
        {
          id: "card-11",
          title: "Database schema v1",
          details: "Designed and migrated the initial schema with users, projects, and tasks tables.",
        },
      ],
    },
  ],
};
