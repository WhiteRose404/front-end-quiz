import React from "react";
import { Navigate } from "react-router";
// import { Redirect } from "react-router-dom";


// make a high level functions that return a component if a successful token validation is done
export default async function WithAuth() {
    // fetch the token from localStorage
    const token = localStorage.getItem("token");
    // if there is no token, return to login page
    if (!token) {
        console.log("no token");
        window.location.href = "/login";
        return;
    }
    // if there is a token, return to component
    // check what if the token is valid
    
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
