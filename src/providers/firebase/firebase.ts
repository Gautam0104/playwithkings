import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from "angularfire2/storage";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase";

@Injectable()
export class FirebaseProvider {
  private messaging: any; // Using any type since firebase.messaging is not available

  constructor(
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage
  ) {
    this.messaging = firebase.messaging();
  }

  // Authentication Methods
  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  // Database Methods
  getData(path: string): Observable<any> {
    return this.afDatabase.object(path).valueChanges();
  }

  getList(path: string): Observable<any[]> {
    return this.afDatabase.list(path).valueChanges();
  }

  setData(path: string, data: any): Promise<void> {
    return this.afDatabase.object(path).set(data);
  }

  updateData(path: string, data: any): Promise<void> {
    return this.afDatabase.object(path).update(data);
  }

  removeData(path: string): Promise<void> {
    return this.afDatabase.object(path).remove();
  }

  // Storage Methods
  uploadFile(path: string, file: File): Promise<any> {
    const ref = this.afStorage.ref(path);
    return ref
      .put(file)
      .snapshotChanges()
      .toPromise()
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      });
  }

  getFileUrl(path: string): Promise<string> {
    const ref = this.afStorage.ref(path);
    return ref.getDownloadURL().toPromise();
  }

  deleteFile(path: string): Promise<void> {
    const ref = this.afStorage.ref(path);
    return ref.delete().toPromise();
  }

  // Real-time Database Methods
  onValue(path: string): Observable<any> {
    return this.afDatabase.object(path).valueChanges();
  }

  onChildAdded(path: string): Observable<any> {
    return this.afDatabase.list(path).valueChanges();
  }

  // Push Notification Methods
  getMessagingToken(): Promise<string> {
    return this.messaging.getToken();
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.messaging.onMessage((payload) => {
        observer.next(payload);
      });
    });
  }
}
