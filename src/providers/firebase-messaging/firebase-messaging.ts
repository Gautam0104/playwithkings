import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import "firebase/messaging";

@Injectable()
export class FirebaseMessagingProvider {
  private messaging: any;

  constructor(private platform: Platform) {
    if (typeof window !== "undefined" && "Notification" in window) {
      this.messaging = firebase.messaging();
    }
  }

  getToken(): Promise<string> {
    if (!this.messaging) {
      return Promise.reject(
        "Firebase messaging is not supported on this platform"
      );
    }

    return this.messaging
      .getToken()
      .then((token) => {
        console.log("FCM Token:", token);
        return token;
      })
      .catch((err) => {
        console.error("Error getting FCM token:", err);
        return Promise.reject(err);
      });
  }

  onMessage(): Observable<any> {
    if (!this.messaging) {
      return Observable.throw(
        "Firebase messaging is not supported on this platform"
      );
    }

    return new Observable((observer) => {
      this.messaging.onMessage((payload) => {
        observer.next(payload);
      });
    });
  }

  onBackgroundMessage(): Observable<any> {
    if (!this.messaging) {
      return Observable.throw(
        "Firebase messaging is not supported on this platform"
      );
    }

    return new Observable((observer) => {
      this.messaging.onBackgroundMessage((payload) => {
        observer.next(payload);
      });
    });
  }

  requestPermission(): Promise<void> {
    if (!this.messaging) {
      return Promise.reject(
        "Firebase messaging is not supported on this platform"
      );
    }

    return this.messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted");
      })
      .catch((err) => {
        console.error("Error requesting notification permission:", err);
        return Promise.reject(err);
      });
  }
}
