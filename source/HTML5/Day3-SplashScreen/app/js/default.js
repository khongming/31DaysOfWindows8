﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var _splash,
        _dismissed = false,
        _coordinates = { x: 0, y: 0, width: 0, height: 0 };


    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {

            _splash = args.detail.splashScreen;
            _splash.addEventListener("dismissed", onSplashScreenDismissed, false);

            DefaultPage.coordinates = _splash.imageLocation;
            
            ExtendedSplash.show(_splash);

            window.addEventListener("resize", onResize, false);

            args.setPromise(WinJS.UI.processAll());
        }
    };

    function onSplashScreenDismissed() {
        
        document.querySelector("#learnMore").addEventListener("click", ExtendedSplash.remove, false);

        if (document.querySelector("#dismissalOutput")) {
            document.querySelector("#dismissalOutput").innerText = "Received the splash screen dismissal event.";
        }
    }

    function onResize() {
        
        if (_splash) {
            DefaultPage.coordinates = _splash.imageLocation;
            ExtendedSplash.updateImageLocation(_splash);
        }
    }

    WinJS.Namespace.define("DefaultPage", {
        coordinates: _coordinates
    });

    app.start();
})();