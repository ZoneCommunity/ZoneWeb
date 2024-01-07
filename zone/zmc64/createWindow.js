// makeWindow.js/createWindow.js

import { genpID, getHpID } from '/zone/zmc64/idHandler.js';

function createWindow(title, width, height, options, contentCallback) {
    const pID = genpID();

    const windowElement = document.createElement("div");
    windowElement.classList.add("window");
    windowElement.id = pID;
    windowElement.style.width = `${width}px`;
    windowElement.style.position = "absolute";
    windowElement.style.userSelect = "none";
    windowElement.style.height = `${height}px`;
    windowElement.style.overflow = "hidden";

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const initialLeft = viewportWidth / 2 - width / 2;
    const initialTop = viewportHeight / 2 - height / 2;
    windowElement.style.top = `${initialTop}px`;
    windowElement.style.left = `${initialLeft}px`;

    const windowHeader = document.createElement("div");
    windowHeader.classList.add("title-bar");

    const windowHContent = document.createElement("div");
    windowHContent.classList.add("title-bar-text");
    windowHContent.textContent = title;

    const windowHControls = document.createElement("div");
    windowHControls.classList.add("title-bar-controls");

    const windowContent = document.createElement("div");
    windowContent.classList.add("window-body");

    // Resize handles (optional)
    if (options.enableResizeHandles) {
        const resizeHandles = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'];
        resizeHandles.forEach((handle) => {
            const handleDiv = document.createElement('div');
            handleDiv.className = `resize-handle ${handle}`;
            windowElement.appendChild(handleDiv);
        });
    }

    windowElement.appendChild(windowHeader);
    windowHeader.appendChild(windowHContent);
    windowHeader.appendChild(windowHControls);

    windowElement.appendChild(windowContent);

// Buttons in windowHControls (optional)
if (options.enableDefaults || options.enableClose || options.enableMinimize || options.enableMaximize) {
    if (options.enableDefaults) {
        options.enableClose = true;
        options.enableMinimize = true;
        options.enableMaximize = true;
    }

    // Create an array to store button elements
    const buttons = [];
    
    if (options.enableMinimize) {
        const wMinimize = document.createElement("button");
        wMinimize.setAttribute("aria-label", "Minimize");
        buttons.push(wMinimize);
    }

    if (options.enableMaximize) {
        const wMaximize = document.createElement("button");
        wMaximize.setAttribute("aria-label", "Maximize");
        buttons.push(wMaximize);
    }

    if (options.enableClose) {
        const wClose = document.createElement("button");
        wClose.setAttribute("aria-label", "Close");
        buttons.push(wClose);
    }

    // Append buttons to windowHControls in the desired order
    buttons.forEach((button) => {
        windowHControls.appendChild(button);
    });
}


    // Array to store elements to be appended
    const elementsToAppend = [];

    // Callback function to populate elementsToAppend
    const populateElements = (elementCallback) => {
        elementCallback(elementsToAppend);
    };

    // Execute contentCallback to populate elementsToAppend
    contentCallback(populateElements);

    // Append elements to windowContent
    elementsToAppend.forEach((element) => {
        windowContent.appendChild(element);
    });

    document.body.appendChild(windowElement);
    ToFocus(windowElement);
}

function ToFocus(window) {
    let windows = document.querySelectorAll('.window');

    windows.forEach((myWindow) => {
        const titleBar = myWindow.querySelector('.title-bar');
        if (titleBar) {
            titleBar.classList.toggle('inactive', myWindow !== window);
            myWindow.classList.toggle('inactive', myWindow !== window);
        }

        myWindow.style.zIndex = myWindow === window ? windows.length : 1;
    });
}

export { createWindow };
