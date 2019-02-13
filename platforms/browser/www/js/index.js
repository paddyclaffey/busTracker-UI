var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var showElement = parentElement.querySelector('.show');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        showElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        window.setInterval(function(){
            app.getPosition();
        // app.sendPosition({ latitude: 1, longitude: 12, accuracy: 123, speed: 1234, timestamp: 1245 });
            
        }, 5000);
    },
    
    getPosition() {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        }
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        var sendPosition1 = app.sendPosition;
         
        function onSuccess(position) {
            sendPosition1({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                speed: position.coords.speed,
                timestamp: position.timestamp
            });
        };

        function onError(error) {
            console.error('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
    },

    sendPosition(location) {
        console.log(location)
        var request = new XMLHttpRequest();
        console.log(request)
        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE) {
                console.log(request.responseText);
            }
        }
        request.open("POST", "https://35.180.199.240:3000/locationUpdate", true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send('latitude=' + location.latitude + '&' +
                     'longitude=' + location.longitude + '&' +
                     'accuracy=' + location.accuracy + '&' +
                     'speed=' + location.speed + '&' +
                     'timestamp=' + location.timestamp
                     );
    }
};
