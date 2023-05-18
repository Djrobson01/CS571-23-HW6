import React, { useEffect, useState } from "react";
import BadgerMessage from "./BadgerMessage";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [del, setDel] = useState(false);

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_14a36d6cb07d9384668f",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    useEffect(() => {
        if(sessionStorage.getItem("delMsg") && sessionStorage.getItem("delMsg") !== "") {
            fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${sessionStorage.getItem("delMsg")}`, {
                method: "DELETE",
                headers: {
                    "X-CS571-ID": "bid_14a36d6cb07d9384668f",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).then(res => res.json()).then(json => {
                sessionStorage.setItem("delMsg", "");
                if(json.msg) {
                    alert(json.msg);
                }
                loadMessages();
            })
        }
    }, [del])

    const onSubmit = (data, e) => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_14a36d6cb07d9384668f",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg) {
                alert(data.msg)
            }
            loadMessages();
        })

        reset({
            title: "",
            content: ""
        })
    }

    const onError = (error, e) => {alert("You must provide both title and content!")}

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            props.login
            ? <form onSubmit={handleSubmit(onSubmit, onError)}>
                <p>Post Title</p>
                <input {...register("title", {
                    required: true
                })} />
                <p>Post Content</p>
                <input {...register("content", {
                    required: true
                })} />
                <br />
                <Button type="submit" style={{marginTop: "10px"}}>Create Post</Button>
            </form>
            : ""
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map((message) => 
                            <BadgerMessage 
                                key={message.id}
                                id={message.id}
                                title={message.title}
                                poster={message.poster} 
                                content={message.content}
                                created={message.created}
                                login={props.login}
                                cb={setDel}
                            />
                        )
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}