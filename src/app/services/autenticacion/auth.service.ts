import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { User, UserInfo } from '../../interfaces/login'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  userInfo: Observable<UserInfo>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
    this.userInfo = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<UserInfo>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  signUp(email: string, password: string, opciones: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(resp => {
        this.updateUser(resp.user, opciones).then(resp => {
          resolve(true);
        });
      }).catch(err => {
        reject(false);
        console.log('something went wrong:', err.message);
      })
    });
  }
  iniciarSesion(email: any, password: any) {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.EmailAuthProvider();
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res.user);
      }, err => {
        reject(err.message);
      })
    });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err.message)
    })
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  actualizarPerfil() {
    let x = this.afAuth.auth.currentUser;
    x.updateProfile({}).then(() => { });
    x.updateEmail('').then(() => { });
    x.sendEmailVerification().then(() => { });
  }

  // SignIn Google
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(provider).then((credenciales) => {
        resolve(this.updateUser(credenciales.user));
        this.router.navigate(['/'])
      }).catch(err => {
        console.log(err);
      })
    })
  }
  private updateUser(authData, rol: any = { reader: true }) {
    const user = new User(authData);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: rol,
      phoneNumber: '12345678',
      password: ''
    };
    return userRef.set(data, { merge: true })
  };
}
