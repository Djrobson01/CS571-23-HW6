import React, { useEffect } from 'react';

export default function BadgerLogout(props) {
    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_14a36d6cb07d9384668f",
                "Content-Type": "application/json"
            },
            credentials: "include",
        }).then(res => res.json()).then(json => {
            sessionStorage.setItem("logged-in", "false")
            sessionStorage.setItem("user", "");
            props.cb((prev) => !prev);
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}