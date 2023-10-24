/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// @ts-nocheck
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

function SignIn(props: any) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    props.auth.signInWithPopup(provider)
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  )
}

export default SignIn
