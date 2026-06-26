"use server"

import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
    return serverMutation("/api/companies", newCompanyData);
}

/* const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const createCompany = async (newCompanyData) => {
    // console.log("baseUrl:", baseUrl);
    const res = await fetch(`${baseUrl}/api/companies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompanyData),
    });
    // console.log("status:", res.status);
    return res.json();
} */