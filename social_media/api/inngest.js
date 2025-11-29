import { serve } from "inngest/next";
import { inngest } from "../server/inngest/index.js";
import { functions } from "../server/inngest/index.js";

export default serve({
  client: inngest,
  functions,
});
