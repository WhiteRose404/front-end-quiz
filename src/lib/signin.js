import React from "react";
import { Navigate } from "react-router";
// import { Redirect } from "react-router-dom";


// make a high level functions that return a component if a successful token validation is done
export default async function signin(username, password) {
    // store the token in localStorage
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
