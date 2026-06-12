// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// export const serverFetch = async (path) => {
//     const res = await fetch(`${baseUrl}${path}`);
//     return res.json();
// }

// export const serverMutation = async (path, data) => {
//     const res = await fetch(`${baseUrl}${path}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });


//     // Handle errors if needed 401 or 403 for example 404 or 500

//     return res.json();
// }


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Invalid JSON response:", text);
    throw error;
  }
};

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  if (!text) return null;

  return JSON.parse(text);
};