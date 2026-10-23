# MoonChat setup: enable real-time messaging

This starter currently runs as a local-only preview. To make messages sync between you and your friends, you need to connect a Firebase project. Follow these steps slowly; don't share passwords or private configuration.

## 1. Create a Firebase project
1. Go to https://console.firebase.google.com/
2. Sign in with Google and create a project named `MoonChat`.
3. Add a Web App in Project settings (the `</>` icon).
4. Copy the Firebase web config. Firebase's web config is designed to be included in client apps, but your database must still be protected by security rules.

## 2. Enable sign-in
1. In Firebase Console, open Build → Authentication.
2. Choose Get started.
3. Enable Google as a sign-in provider.
4. Add your deployed domain to Authentication → Settings → Authorized domains.

## 3. Create Firestore
1. Open Build → Firestore Database → Create database.
2. Choose a location close to your users.
3. Do not use open/test rules for a public website.

## 4. Important security note
Before adding a public chat to the internet, configure Firestore rules so only authenticated users can read and write messages, and each user can only send messages under their own user ID. A basic rule outline for a single shared room is:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.text is string
        && request.resource.data.text.size() > 0
        && request.resource.data.text.size() <= 500;
      allow update, delete: if false;
    }
  }
}
```

This outline permits any signed-in user to read the shared room, so do not use it for private conversations. For private rooms, implement membership-based access checks before sharing.

## 5. Deployment
The current starter is plain HTML/CSS/JavaScript, so you can publish it with a static hosting service such as GitHub Pages or Netlify. Upload `index.html`, `style.css`, and `app.js` to your repository/site. The Firebase integration still needs to be implemented before messages sync across devices.

## Privacy
- Use a nickname rather than your full name.
- Never publish passwords, API secrets, or private personal details.
- Don't share a public-room link if you expect messages to be private.
- Ask friends before posting their messages or personal information.
