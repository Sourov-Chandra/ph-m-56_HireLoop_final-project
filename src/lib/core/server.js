const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/* export const serverFetch = async (url) => {
    console.log("Fetching URL:", `${baseUrl}${url}`); 
    const res = await fetch(`${baseUrl}${url}`);
    return res.json();
}; */
/* export const serverFetch = async (url) => {
  const fullUrl = new URL(`${baseUrl}${url}`);
  console.log("Fetching URL:", fullUrl.toString());
  const res = await fetch(fullUrl.toString());
  return res.json();
}; */

export const serverFetch = async (url) => {
  const fullUrl = new URL(`${baseUrl}${url}`);
  const res = await fetch(fullUrl.toString());

  if (!res.ok) {
    const text = await res.text();
    console.error(
      `serverFetch failed: ${res.status} ${fullUrl}`,
      text.slice(0, 200),
    );
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  return res.json();
};


export const serverMutation = async (url, body) => {
    const res = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return res.json();
};