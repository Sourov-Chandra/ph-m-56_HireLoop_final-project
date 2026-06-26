"use server";

import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
  return serverMutation("/api/jobs", newJobData);
};

/* const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createJob = async (newJobData) => {
  console.log("baseUrl:", baseUrl);

  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });

  console.log("status:", res.status);

  return res.json();
};
 */