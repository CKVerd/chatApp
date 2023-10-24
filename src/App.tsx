/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// @ts-nocheck
import './App.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import SignIn from './assets/components/SignIn'
import ChatRoom from './assets/components/ChatRoom'

firebase.initializeApp({
  apiKey: 'AIzaSyAf5-qy7WL6jysXJ-NF4qviRGFTm7ozLrc',
  authDomain: 'test-chat-a1c01.firebaseapp.com',
  projectId: 'test-chat-a1c01',
  storageBucket: 'test-chat-a1c01.appspot.com',
  messagingSenderId: '686463572792',
  appId: '1:686463572792:web:20bcff89a118dec009ffcd',
})
const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)
  return (
    <>
      <div>{user ? <ChatRoom user={user} auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}</div>
    </>
  )
}

export default App
