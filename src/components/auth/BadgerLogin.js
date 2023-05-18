import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function BadgerLogin(props) {

    const nav = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = (data, e) => {
        fetch("https://www.cs571.org/s23/hw6/api/login", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_14a36d6cb07d9384668f",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data) 
        })
        .then(res => {
            if(res["status"] == 200) { 
                sessionStorage.setItem("user", data["username"]);
                alert("Login successful!");
                props.cb((prev) => !prev);
                nav("../");
            }
            else if(res["status"] == 401) {
                alert("Incorrect password!");
            }
            else if(res["status"] == 404) {
                alert("Incorrect username!");
            }
            return res.json();
        })
        .catch(err => console.log(err))
    }; 
    
    const onError = (errors, e) => {
        alert("You must provide both a username and password!");
    }

    // add a comment saying I used react-hook-forms when submitting

    return <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h4>Username</h4>
            <input {...register("username", {
                required: true
            })} />
            <h4>Password</h4>
            <input type="password" {...register("password", {
                required: true
            })} />
            <br />
            <Button type="submit" style={{marginTop: "10px"}}>Login</Button>
        </form>
    </>
}