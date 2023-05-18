import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function BadgerRegister() {
    const {
        register,
        handleSubmit,
        getValues
    } = useForm();

    const onSubmit = (data, e) => {
        console.log(data);
        fetch("https://www.cs571.org/s23/hw6/api/register", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_14a36d6cb07d9384668f",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data) 

        })
        .then(res => res.json())
        .then(data => alert(data['msg']))
        .catch(err => console.log(err))
    }; 
    
    const onError = (errors, e) => {
        const k = Object.keys(errors);
        alert(errors[k[0]]['message']);
    }

    return <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h4>Username</h4>
            <input {...register("username", {
                required: "You must provide both a username and password!"
            })} />
            <h4>Password</h4>
            <input type="password" {...register("password", {
                required: "You must provide both a username and password!"
            })} />
            <h4>Repeat Password</h4>
            <input type="password" {...register("confPass", {
                validate: {
                    equal: v => v === getValues('password') || "Passwords do not match!"
                },
                required: false
            })} />
            <br />
            <Button type="submit" style={{marginTop: "10px"}}>Register</Button>
        </form>
    </>
    
}