declare module "firebase" {
  namespace firebase {
    interface FirebaseConfig {
      apiKey?: string;
      authDomain?: string;
      databaseURL?: string;
      projectId?: string;
      storageBucket?: string;
      messagingSenderId?: string;
    }

    function initializeApp(config: FirebaseConfig): any;
    function auth(): any;
    function database(): any;
    function storage(): any;
  }

  export = firebase;
}

declare module "firebase" {
  export interface FirebaseApp {
    auth(): FirebaseAuth;
    database(): FirebaseDatabase;
    storage(): FirebaseStorage;
    messaging(): FirebaseMessaging;
  }

  export interface FirebaseAuth {
    currentUser: FirebaseUser | null;
    onAuthStateChanged(
      callback: (user: FirebaseUser | null) => void
    ): () => void;
    signInWithEmailAndPassword(
      email: string,
      password: string
    ): Promise<FirebaseUser>;
    signOut(): Promise<void>;
  }

  export interface FirebaseUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }

  export interface FirebaseDatabase {
    ref(path?: string): FirebaseDatabaseReference;
  }

  export interface FirebaseDatabaseReference {
    once(eventType: string): Promise<FirebaseDataSnapshot>;
    on(
      eventType: string,
      callback: (snapshot: FirebaseDataSnapshot) => void
    ): () => void;
    set(value: any): Promise<void>;
    update(value: any): Promise<void>;
    remove(): Promise<void>;
  }

  export interface FirebaseDataSnapshot {
    val(): any;
    exists(): boolean;
    key: string | null;
  }

  export interface FirebaseStorage {
    ref(path?: string): FirebaseStorageReference;
  }

  export interface FirebaseStorageReference {
    put(file: File | Blob): Promise<FirebaseUploadTask>;
    getDownloadURL(): Promise<string>;
  }

  export interface FirebaseUploadTask {
    on(event: string, callback: (snapshot: any) => void): FirebaseUploadTask;
    then(
      onFulfilled?: (snapshot: any) => any,
      onRejected?: (error: any) => any
    ): Promise<any>;
  }

  export interface FirebaseMessaging {
    getToken(): Promise<string>;
    onMessage(callback: (payload: any) => void): () => void;
    onTokenRefresh(callback: (token: string) => void): () => void;
  }

  export function initializeApp(config: any): FirebaseApp;
  export function auth(): FirebaseAuth;
  export function database(): FirebaseDatabase;
  export function storage(): FirebaseStorage;
  export function messaging(): FirebaseMessaging;
}
