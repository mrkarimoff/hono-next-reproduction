import { hc } from "hono/client";
import { AppType } from "api";

const baseUrl = "http://localhost:8787";

const getHonoClient = (token?: string | null) => {
  if (token) {
    return hc<AppType>(baseUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        mode: "cors",
      },
    });
  }

  return hc<AppType>(baseUrl);
};

export default getHonoClient;
