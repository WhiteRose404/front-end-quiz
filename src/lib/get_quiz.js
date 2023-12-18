export default async function getQuiz(topic) {
    // store the token in localStorage
    const token = localStorage.getItem("token");
    // if there is no token, return to login page
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
    const res = await fetch(`http://localhost:5000/api/v1/topic/${topic}`, {
        method: "GET",
        credentials: 'include', 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
    const data = await res.json();
    console.log("what is up with this", data);
    if (!data.topic || !data.quiz) {
        throw new Error(data.error);
        return;
    }
    return data.quiz; // this is a string for production
    // return JSON.stringify(data.quiz);
}
