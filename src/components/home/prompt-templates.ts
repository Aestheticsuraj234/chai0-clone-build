import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  Clock,
  Cloud,
  Gamepad2,
  Image,
  LayoutDashboard,
  LineChart,
  ListChecks,
  Mail,
  NotebookPen,
  Palette,
  Rocket,
  Ruler,
  Sparkles,
  CircleUserRound,
  Users,
} from "lucide-react";

/**
 * A single starter prompt suggestion.
 *
 * @property label - Short button label (e.g. "Todo App").
 * @property icon - Lucide icon shown on the suggestion button.
 * @property prompt - The full prompt text inserted when chosen.
 */
export type PromptTemplate = {
  label: string;
  icon: LucideIcon;
  prompt: string;
};

/**
 * A named group of related {@link PromptTemplate}s (e.g. "Productivity").
 */
export type PromptTemplateCategory = {
  name: string;
  templates: PromptTemplate[];
};

/**
 * All starter prompt suggestions shown under the home-page composer, grouped by
 * category.
 */
export const promptTemplateCategories: PromptTemplateCategory[] = [
  {
    name: "Landing pages",
    templates: [
      {
        label: "SaaS Landing",
        icon: Rocket,
        prompt:
          "Build a modern SaaS landing page with a hero section, feature grid, pricing table, testimonials, and a footer with newsletter signup",
      },
      {
        label: "Product Launch",
        icon: Sparkles,
        prompt:
          "Build a product launch page with a countdown timer, feature highlights, early-access signup form, and social proof section",
      },
      {
        label: "Waitlist",
        icon: ClipboardList,
        prompt:
          "Build a waitlist page with email capture, referral counter, FAQ accordion, and a minimal animated hero",
      },
      {
        label: "Portfolio",
        icon: CircleUserRound,
        prompt:
          "Build a personal portfolio site with project cards, about section, skills list, and a contact call-to-action",
      },
    ],
  },
  {
    name: "Business tools",
    templates: [
      {
        label: "Contact Form",
        icon: Mail,
        prompt:
          "Build a contact form with name, email, message fields, validation, loading state, and a success confirmation screen",
      },
      {
        label: "Invoice Generator",
        icon: Briefcase,
        prompt:
          "Build an invoice generator where users can add line items, calculate tax and totals, preview the invoice, and export as PDF-ready layout",
      },
      {
        label: "Booking Calendar",
        icon: CalendarDays,
        prompt:
          "Build a booking calendar with available time slots, appointment form, confirmation summary, and booked-slot indicators",
      },
      {
        label: "CRM Dashboard",
        icon: Users,
        prompt:
          "Build a lightweight CRM dashboard with lead cards, pipeline stages, activity timeline, and quick-add contact modal",
      },
    ],
  },
  {
    name: "Productivity",
    templates: [
      {
        label: "Todo App",
        icon: ListChecks,
        prompt:
          "Build a todo app with add, edit, delete, mark complete, filter by status, and local storage persistence",
      },
      {
        label: "Kanban Board",
        icon: LayoutDashboard,
        prompt:
          "Build a kanban board with draggable columns for To Do, In Progress, and Done, plus add-card forms in each column",
      },
      {
        label: "Notes App",
        icon: NotebookPen,
        prompt:
          "Build a notes app with sidebar note list, rich text editor area, search, tags, and autosave indicator",
      },
      {
        label: "Habit Tracker",
        icon: CalendarDays,
        prompt:
          "Build a habit tracker with daily check-ins, streak counter, weekly calendar view, and progress stats",
      },
    ],
  },
  {
    name: "Utilities",
    templates: [
      {
        label: "Finance Calculator",
        icon: LineChart,
        prompt:
          "Build a finance calculator with loan, savings, and investment tabs, input sliders, and charts showing projections over time",
      },
      {
        label: "Unit Converter",
        icon: Ruler,
        prompt:
          "Build a unit converter supporting length, weight, temperature, and currency with instant conversion and swap-units button",
      },
      {
        label: "Pomodoro Timer",
        icon: Clock,
        prompt:
          "Build a pomodoro timer with work/break cycles, start-pause-reset controls, session counter, and sound notification toggle",
      },
      {
        label: "Weather Widget",
        icon: Cloud,
        prompt:
          "Build a weather widget with city search, current conditions, hourly forecast row, and a 5-day outlook card layout",
      },
    ],
  },
  {
    name: "Creative",
    templates: [
      {
        label: "Image Editor",
        icon: Image,
        prompt:
          "Build a simple image editor with upload, crop, brightness/contrast sliders, filter presets, and download button",
      },
      {
        label: "Mini Game",
        icon: Gamepad2,
        prompt:
          "Build a mini browser game with keyboard controls, score tracking, lives, restart flow, and a start screen",
      },
      {
        label: "Quiz App",
        icon: ClipboardList,
        prompt:
          "Build a quiz app with multiple-choice questions, progress bar, score tally, results summary, and retake option",
      },
      {
        label: "Drawing Canvas",
        icon: Palette,
        prompt:
          "Build a drawing canvas with brush size and color picker, eraser, clear canvas, and save-as-image export",
      },
    ],
  },
];

/**
 * A flat list of every {@link PromptTemplate} across all categories.
 */
export const allPromptTemplates = promptTemplateCategories.flatMap(
  (category) => category.templates,
);

/**
 * Pick a random prompt template from {@link allPromptTemplates}.
 *
 * @returns A randomly selected {@link PromptTemplate}.
 */
export function getRandomPromptTemplate() {
  return allPromptTemplates[Math.floor(Math.random() * allPromptTemplates.length)];
}
