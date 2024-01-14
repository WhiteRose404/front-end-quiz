import React from "react";
import { Navigate } from "react-router";


export default async function WithAuth() {
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
}
