import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BadgerLayout from './BadgerLayout';
import BadgerLogin from '../auth/BadgerLogin';
import BadgerRegister from '../auth/BadgerRegister';
import BadgerLogout from '../auth/BadgerLogout';
import BadgerChatroom from '../content/BadgerChatroom';
import BadgerChatHome from '../content/BadgerChatHome';
import BadgerNoMatch from '../content/BadgerNoMatch';

function BadgerApp() {

  const [chatrooms, setChatrooms] = useState([]);
  const [log, setLog] = useState(false);

  useEffect(() => {
    fetch('https://cs571.org/s23/hw6/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_14a36d6cb07d9384668f",
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json);
    })
  }, []);

  useEffect(() => {}, [log])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BadgerLayout chatrooms={chatrooms} login={log}/>}>
          <Route index element={<BadgerChatHome login={log} />} />
          <Route path="/login" element={<BadgerLogin cb={setLog}/>}></Route>
          <Route path="/register" element={<BadgerRegister />}></Route>
          <Route path="/logout" element={<BadgerLogout cb={setLog}/>}></Route>
          {
            chatrooms.map(chatroom => {
              return <Route key={chatroom} path={`chatrooms/${chatroom}`} element={<BadgerChatroom name={chatroom} login={log}/>} />
            })
          }
          <Route path="*" element={<BadgerNoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default BadgerApp;
