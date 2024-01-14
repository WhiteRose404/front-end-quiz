export default async function Register(email, password) {
    const res = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        credentials: 'include', 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });
    const data = await res.json();
    if (data.error || data.message === "Invalid credentials" || data.access_token === undefined) {
        throw new Error(data.error);
        return;
    }
    localStorage.setItem("token", data.access_token);
    window.location.href = "/quiz";
}
