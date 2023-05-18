import React from "react";
import { Button } from 'react-bootstrap';

function BadgerMessage(props) {

    const dt = new Date(props.created);

    const remove = () => {
        sessionStorage.setItem("delMsg", `${props.id}`);
        props.cb((prev) => !prev)
    }

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            (props.login && props.poster === sessionStorage.getItem("user")) ? <Button variant="danger" onClick={remove}>Delete</Button> : ""
        }

    </>
}

export default BadgerMessage;