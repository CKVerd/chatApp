import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

function ChatRoom(props: any) {
  const signOut = () => {
    props.auth.signOut()
  }

  const messagesRef = props.firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, { idField: 'id' })
  const [formValue, setFormValue] = useState('')
  const { uid, photoURL } = props.auth.currentUser

  const sendMessage = async (e: any) => {
    e.preventDefault()
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })
    setFormValue('')
  }

  return (
    <div className="p-2 flex flex-col items-center gap-2 h-screen w-screen">
      <div className="h-[10%] flex items-center w-1/2 justify-between">
        <span className="font-extrabold">
          Hello {props.user.displayName.split(' ')[0]}!
        </span>
        <button onClick={signOut}>Logout</button>
      </div>
      <div className="h-[70%] flex flex-col gap-2 border-{#c9c9c9} border w-1/2 p-4 overflow-y-auto">
        {messages &&
          messages.map((msg) => {
            return (
              <div
                key={msg.id}
                className={`w-full flex ${
                  msg.uid === props.auth.currentUser.uid ? 'sent' : 'received'
                }`}>
                <div className="h-fit message">
                  <img referrerPolicy="no-referrer" src={msg.photoURL} />
                  <p>{msg.text}</p>
                </div>
              </div>
            )
          })}
      </div>
      <form
        className="h-[20%] flex items-center justify-center w-1/2 gap-4"
        onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Write a message here!"
          className="w-full h-10 pl-5 p-2 rounded-full"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}></input>
        <button className="rounded-full rounded-fu">Send</button>
      </form>
    </div>
  )
}

export default ChatRoom
