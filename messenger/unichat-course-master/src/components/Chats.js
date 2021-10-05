import React, {useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine} from 'react-chat-engine'
import {auth} from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Chats = ()=>{
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    console.log(user);
    const getFile = async (url)=>{
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }
    const handleLogout = async ()=>{
        await auth.signOut();
        history.push('/')
    }
    useEffect(()=>{
        if (!user){
            history.push('/')
            return
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "70b39f5b-9ed7-4e62-91ec-7f44acf1fcbe",
                "user-name": user.email,
                "user-secret": user.uid
            }
        }).then(()=>{
            setLoading(false);
        }).catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid);
            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name);
                    axios.post('https://api.chatengine.io/users',
                                formdata,
                                {headers: {"private-key": "e809f5e8-4a49-4003-9543-cf39dc42d3ea"}})
                })
                .then(()=>setLoading(false))
                .catch((error)=> console.log(error))
        })
    }, [user, history])

    if (!user||loading) return 'Loading..'
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height = "calc(100vh-66px)"
                projectID="70b39f5b-9ed7-4e62-91ec-7f44acf1fcbe"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats