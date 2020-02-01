import firebaseConfig from './config'
import app from 'firebase/app'
import 'firebase/firebase-auth'



class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    //app.analytics();
    this.auth = app.auth()
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )
    return await newUser.user.updateProfile({
      displayName: name
    })
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }

  async resetPasswordEmail(email) {
    await this.auth.sendPasswordResetEmail(email)
  }
}

const firebase = new Firebase()
export default firebase;