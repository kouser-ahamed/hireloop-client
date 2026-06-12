const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}

export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });


    // Handle errors if needed 401 or 403 for example 404 or 500

    return res.json();
}