

export default async function topic(topic) {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("no token");
        window.location.href = "/login";
        return;
    }
    await fetch("http://localhost:5000/api/v1/verfiy", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }).catch((err) => {
        console.log(err);
        window.location.href = "/login";
        return;
    });
        const res = await fetch(`http://localhost:5000/api/v1/topic`, {
            method: "POST",
            credentials: 'include', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({topic}),
        });
        const data = await res.json();
        if (data.error || data.topic_def || data.topic) {
            throw new Error(data.error);
            return;
        }
        return data;
}
