import { hc } from "hono/client";
import { AppType } from "api";

const client = hc<AppType>("http://localhost:8787");

export default client;
