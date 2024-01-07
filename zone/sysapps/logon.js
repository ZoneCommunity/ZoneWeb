// logon.exe

import { genpID, getHpID } from '/zone/zmc64/idHandler.js';

import { createWindow } from '/zone/zmc64/createWindow.js';

function LoadLogonExec() {
    createWindow("Logon", 300, 170, {
        enableResizeHandles: true,
        enableDefaults: true,
    }, (populateElements) => {
        const pElement = document.createElement("p");
        pElement.textContent = "Welcome! Please login.";

        var inputB = document.createElement("div");
        inputB.classList.add("field-row-stacked");

        var inputElement = document.createElement("input");
        inputElement.type = "text";
        var labelElement = document.createElement("label");
        labelElement.setAttribute("for", "text1");
        labelElement.textContent = "Username:";

        var inputB2 = document.createElement("div");
        inputB2.classList.add("field-row-stacked");

        var inputElement2 = document.createElement("input");
        inputElement2.type = "text";
        var labelElement2 = document.createElement("label");
        labelElement2.setAttribute("for", "text2");
        labelElement2.textContent = "Password:";

        var section = document.createElement('section');
        section.setAttribute('class', 'field-row');
        section.style.justifyContent = 'flex-end';

        var loginBtn = document.createElement("button");
        loginBtn.textContent = "Login";
        loginBtn.addEventListener("click", Logon);

        // Add elements to the populateElements array
        populateElements((elementsToAppend) => {
            elementsToAppend.push(pElement, inputB, inputB2, section, loginBtn);
        });
    });
}



function Logon () {
    pID = genpID();

    var windowElement = document.createElement("div");
    windowElement.classList.add("window");
    windowElement.id = pID;
    windowElement.style.width = "300px";
    windowElement.style.position = "absolute";
    windowElement.style.userSelect = "none";
    windowElement.style.height = "170px";
    windowElement.style.overflow = "hidden";
    viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    initialLeft = viewportWidth / 2 - 150; // Half of the window width
    initialTop = viewportHeight / 2 - 85; // Half of the window height
    windowElement.style.top = initialTop + "px";
    windowElement.style.left = initialLeft + "px";
    windowElement.style.zIndex = pID;

    var windowHeader = document.createElement("div");
    windowHeader.classList.add("title-bar");

    var windowHContent = document.createElement("div");
    windowHContent.classList.add("title-bar-text");
    windowHContent.textContent = ("Test");

    var windowHControls = document.createElement("div");
    windowHControls.classList.add("title-bar-controls");

    var wMinimize = document.createElement("button");
    wMinimize.setAttribute("aria-label", "Minimize");
    var wMaximize = document.createElement("button");
    wMaximize.setAttribute("aria-label", "Maximize");
    var wClose = document.createElement("button");
    wClose.setAttribute("aria-label", "Close");

    var pElement = document.createElement("p");
    pElement.textContent = "Welcome! Please login.";

    var inputB = document.createElement("div");
    inputB.classList.add("field-row-stacked");

    var inputElement = document.createElement("input");
    inputElement.type = "text";
    var labelElement = document.createElement("label");
    labelElement.setAttribute("for", "text1");
    labelElement.textContent = "Username:";

    var inputB2 = document.createElement("div");
    inputB2.classList.add("field-row-stacked");

    var inputElement2 = document.createElement("input");
    inputElement2.type = "text";
    var labelElement2 = document.createElement("label");
    labelElement2.setAttribute("for", "text2");
    labelElement2.textContent = "Password:";

    var section = document.createElement('section');
    section.setAttribute('class', 'field-row');
    section.style.justifyContent = 'flex-end';

    var loginBtn = document.createElement("button");
    loginBtn.textContent = "Login";
    loginBtn.addEventListener("click", Logon);

    

    var windowContent = document.createElement("div");
    windowContent.classList.add("window-body");


    // Resize handles
    const resizeHandles = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'];

    resizeHandles.forEach((handle) => {
        const handleDiv = document.createElement('div');
        handleDiv.className = `resize-handle ${handle}`;
        windowElement.appendChild(handleDiv);
    });

    windowElement.appendChild(windowHeader);
    windowHeader.appendChild(windowHContent);
    windowHeader.appendChild(windowHControls);
    windowHControls.appendChild(wMinimize);
    windowHControls.appendChild(wMaximize);
    windowHControls.appendChild(wClose);

    windowElement.appendChild(windowContent);

    windowContent.appendChild(pElement);

    section.appendChild(loginBtn);

    document.body.appendChild(windowElement);

    // Position and size the resize handles
    const handleSize = 10; // Adjust the size as needed
    const handleStyle = {
        position: 'absolute',
        width: `${handleSize}px`,
        height: `${handleSize}px`,
        backgroundColor: 'transparent', // Set to a color to make them visible
        cursor: 'se-resize', // Default cursor style
    };

    const handles = {
        top: { top: 0, left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize', width: '100%', height: `${handleSize}px` },
        'top-right': { top: 0, right: 0, cursor: 'ne-resize', width: `${handleSize}px`, height: `${handleSize}px`, zIndex: 1 },
        right: { top: '50%', right: 0, transform: 'translateY(-50%)', cursor: 'e-resize', width: `${handleSize}px`, height: '100%' },
        'bottom-right': { bottom: 0, right: 0, cursor: 'se-resize', width: `${handleSize}px`, height: `${handleSize}px`, zIndex: 1 },
        bottom: { bottom: 0, left: '50%', transform: 'translateX(-50%)', cursor: 's-resize', width: '100%', height: `${handleSize}px` },
        'bottom-left': { bottom: 0, left: 0, cursor: 'sw-resize', width: `${handleSize}px`, height: `${handleSize}px`, zIndex: 1 },
        left: { top: '50%', left: 0, transform: 'translateY(-50%)', cursor: 'w-resize', width: `${handleSize}px`, height: '100%' },
        'top-left': { top: 0, left: 0, cursor: 'nw-resize', width: `${handleSize}px`, height: `${handleSize}px`, zIndex: 1 },
    };

    resizeHandles.forEach((handle, index) => {
        const handleDiv = windowElement.querySelector(`.resize-handle.${handle}`);
        Object.assign(handleDiv.style, handleStyle, handles[handle]);
    });

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

export { LoadLogonExec, Logon };
