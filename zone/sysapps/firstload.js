// firstload.exe

import { genpID, getHpID } from '/zone/zmc64/idHandler.js';

let viewportWidth, viewportHeight, initialLeft, initialTop;

let pID
// Function to create a window
function LoadFirstLoadExec() {
    pID = genpID();

    var windowElement = document.createElement("div");
    windowElement.classList.add("window");
    windowElement.id = pID;
    windowElement.style.width = "400px";
    windowElement.style.position = "absolute";
    windowElement.style.userSelect = "none";
    windowElement.style.height = "200px";
    windowElement.style.overflow = "hidden";
    viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    initialLeft = viewportWidth / 2 - 200; // Half of the window width
    initialTop = viewportHeight / 2 - 100; // Half of the window height
    windowElement.style.top = initialTop + "px";
    windowElement.style.left = initialLeft + "px";
    windowElement.style.zIndex = pID;

    var windowHeader = document.createElement("div");
    windowHeader.classList.add("title-bar");

    var windowHContent = document.createElement("div");
    windowHContent.classList.add("title-bar-text");
    windowHContent.textContent = ("Please wait...");

    var windowHControls = document.createElement("div");
    windowHControls.classList.add("title-bar-controls");

    var pElement = document.createElement("p");
    pElement.textContent = "Applying your personal settings...";

    var windowContent = document.createElement("div");
    windowContent.classList.add("window-body");

    windowElement.appendChild(windowHeader);
    windowHeader.appendChild(windowHContent);
    windowHeader.appendChild(windowHControls);

    windowElement.appendChild(windowContent);

    windowContent.appendChild(pElement);

    document.body.appendChild(windowElement);
    zindexU();

}

function zindexU() {
    let windows = document.querySelectorAll('.window');

    windows.forEach((myWindow, index) => {
    var highdex = getHpID();
    // Bring the active window to the front by setting a higher z-index
    const activeWindow = document.getElementById(highdex);

    windows.forEach((window) => {
        if (window.style.zIndex !== highdex) {
                window.style.zIndex = 1; // Lower z-index for inactive windows
                window.querySelector('.title-bar').classList.add('inactive');
            }
        });

        activeWindow.style.zIndex = windows.length; // Bring the active window to the front
        activeWindow.querySelector('.title-bar').classList.remove('inactive');
    });
}

export { LoadFirstLoadExec };
