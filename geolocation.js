const getLocationButton = document.getElementById('get-location');
const locationDisplay = document.getElementById('location');


getLocationButton.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            locationDisplay.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
        },(error) => {
            alert('Error getting location:' + error.message);
        });
    }else {
        alert('Geolocation is not supported by this browser');
    }
});


const notificationButton = document.getElementById('show-notification');

notificationButton.addEventListener('click', () => {
    console.log("Notification button clicked");

    if (Notification.permission === 'granted') {
        console.log("Permission granted");
        setTimeout(() => {
            new Notification("Hello! You're at " + locationDisplay.innerHTML + " 📍");
        }, 500);
    } else if (Notification.permission !== "denied") {
        console.log("Requesting permission...");
        Notification.requestPermission().then((permission) => {
            console.log("Permission result:", permission);
            if (permission === 'granted') {
                setTimeout(() => {
                    new Notification("Hello! You're at " + locationDisplay.innerHTML + " 📍");
                }, 500);
            }
        });
    } else {
        console.log("Notifications denied");
        alert('You need to allow notifications.');
    }
});


const copyButton = document.getElementById('copy-location');

copyButton.addEventListener('click', () => {
    const locationText = locationDisplay.innerHTML;

    if (!locationText || !locationText.includes("Latitude")) {
        alert("Please fetch your location first.");
        return;
    }

    navigator.clipboard.writeText(locationText).then(() => {
        alert('Location copied to clipboard');
    }).catch((err) => {
        alert('Failed to copy text: ' + err);
    });
});
