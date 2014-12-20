Angular Firebase Meetup @fictiziaformacion
================

Web app used for the meetup @fictiziaformacion.

## Installation

1. _Optional:_ create a [c9.io](http://c9.io) account.
2. Create a [firebase](https://www.firebase.com/) account and app.
2. Clone the repository from github: [github.com/isorna/angular-firebase.git](https://github.com/isorna/angular-firebase.git).
3. Set up your app [firebase hosting](https://YOUR-APP-URL.firebaseio.com/?page=Hosting).
4. Activate Login & Auth for Github inside firebase, and create a github app.
5. Inside `js/app.js` and `firebase.json`, replace __angularfire-meetup__ with your app URL.
6. Then deploy your website with `firebase deploy`.
7. Visit your app online: [YOUR-APP-URL.firebaseapp.com](https://YOUR-APP-URL.firebaseapp.com/).

## Firebase

* Hosting for static apps, and includes deployment rollbacks.
* Document database hosting, with JSON import/export.
* Declarative security rules implementation on server via JSON.
* Built-in simulator and analytics.
* User Login & Authentication.
 * Register the corresponding app (Github, twitter, ...), then activate it from the dashboard.
 * Use firebase api for authentication: [login with github](https://www.firebase.com/docs/web/guide/login/github.html).
* Creating a new project is easy:
 * Install firebase tools: `sudo npm install -g firebase-tools`.
 * `cd` into your website directory and run `firebase init`.

## Links

* [AngularFire documentation](https://www.firebase.com/docs/web/libraries/angular/).
* [User authentication with firebase](https://www.firebase.com/docs/web/guide/user-auth.html).
* [Security & rules guide](https://www.firebase.com/docs/security/guide/securing-data.html).
* [Angular Material Design project on github](https://github.com/angular/material).
* [See the application Live](https://angularfire-meetup.firebaseapp.com/)
