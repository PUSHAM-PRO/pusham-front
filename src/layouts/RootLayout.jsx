import SideBar from '../components/SideBar';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from 'react';
import { apiUpdateProfile } from '../services/auth';


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxSlWotU1ly1O0zeyvEJK-oeBjA1m4is8",
    authDomain: "pushanotification.firebaseapp.com",
    projectId: "pushanotification",
    storageBucket: "pushanotification.firebasestorage.app",
    messagingSenderId: "752431191312",
    appId: "1:752431191312:web:dc2455b78896f3f9034195",
    measurementId: "G-TZWMT5CWHG"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);


const RootLayout = ({ children }) => {
    useEffect(() => {
        // Add the public key generated from the console here.
        getToken(messaging, { vapidKey: "BCZ6z1ijhgwO5DZupmFHhQ7rpjzixz6mZbCdo478Fo_2a1jgo7AoxjQTTl9lWcSml9VPQ7uNOT9FkLIij52T84A" }).then((currentToken) => {
            if (currentToken) {
                console.log(currentToken);
                apiUpdateProfile({ fcmToken: currentToken })
                // Send the token to your server and update the UI if necessary
                // ...
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">

            <SideBar />


            <div className="flex-1 p-4  bg-gray-100">
                {children}
            </div>
        </div>
    );
};

export default RootLayout;
