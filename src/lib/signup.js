
// make a high level functions that return a component if a successful token validation is done
export default async function signup(username, password) {
    // store the token in localStorage
    const res = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        credentials: 'include', 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });
    const data = await res.json();
    if (data.error || data.message === "User already exists") {
        throw new Error(data.error);
    }
}
