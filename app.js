(function () {
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCjt34AnxhfJJmS5d1H5P6PobE7Rif8sHY",
        authDomain: "satisfactionsurvey-b7928.firebaseapp.com",
        databaseURL: "https://satisfactionsurvey-b7928.firebaseio.com",
        projectId: "satisfactionsurvey-b7928",
        storageBucket: "satisfactionsurvey-b7928.appspot.com",
        messagingSenderId: "777918522429"

    };
    firebase.initializeApp(config);

    const preObject = document.getElementById('object');

    const dbRefObject = firebase.database().ref().child('object');

    dbRefObject.on('value', snap => console.log(snap.val()));

}());