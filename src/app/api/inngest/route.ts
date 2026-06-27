import { inngest } from "@/features/inngest/client";
import { processTask } from "@/features/inngest/functions";
import { serve } from "inngest/next";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask],
});