// venti UI
import { LoadLogonExec } from '/zone/sysapps/logon.js';
import { LoadFirstLoadExec } from '/zone/sysapps/firstload.js';
import { genpID, getHpID } from '/zone/zmc64/idHandler.js';

let pID;
let viewportWidth, viewportHeight, initialLeft, initialTop;



// remove ventiLoad
const existingScript = document.querySelector('script[src="core/ventiLoad.js"]');

// Create a new script element for ventiload.js
const newScript = document.createElement('script');
newScript.type = "module";
newScript.src = 'zone/zmc64/windower.js';

// Replace the existing script with the new script
existingScript.parentNode.replaceChild(newScript, existingScript);

// Load logon.exe



LoadFirstLoadExec();


setTimeout(function() {
    pID = getHpID();
    document.getElementById(pID).remove();
}, 1400);


// build taskbar

setTimeout(function() {

var TBContent = document.createElement("div");
TBContent.id = "taskbar";
TBContent.style.width = "100%";
TBContent.style.position = "fixed";  // Use 'fixed' instead of 'absolute'
TBContent.style.userSelect = "none";
TBContent.style.height = "45px";
TBContent.style.overflow = "hidden";
TBContent.style.bottom = "0";  // Set to bottom of the screen
TBContent.style.left = "0";    // Set to left of the screen
TBContent.style.display = "flex";  // Use 'flex' to enable flexbox
TBContent.style.alignItems = "center";  // Vertically center the content


var StartBtn = document.createElement("button");
StartBtn.textContent = "Menu";
StartBtn.style.fontSize = "13px";
StartBtn.style.height = "80%";
StartBtn.style.fontWeight = "500";
// StartBtn.addEventListener("click", Logon);

TBContent.appendChild(StartBtn);

document.body.appendChild(TBContent);

}, 1500);


setTimeout(function() {
    pID = genpID();

    var windowElement = document.createElement("div");
    windowElement.classList.add("window");
    windowElement.id = pID;
    windowElement.style.width = "600px";
    windowElement.style.position = "absolute";
    windowElement.style.userSelect = "none";
    windowElement.style.height = "270px";
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
    windowHContent.textContent = ("Welcome!");

    var windowHControls = document.createElement("div");
    windowHControls.classList.add("title-bar-controls");

    var wMinimize = document.createElement("button");
    wMinimize.setAttribute("aria-label", "Minimize");
    var wMaximize = document.createElement("button");
    wMaximize.setAttribute("aria-label", "Maximize");
    var wClose = document.createElement("button");
    wClose.setAttribute("aria-label", "Close");

    var pElement = document.createElement("p");
    pElement.textContent = "This is OS! You can use it for your everyday tasks.";

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

    windowContent.appendChild(section);

    section.appendChild(loginBtn);
    section.appendChild(labelElement);
    section.appendChild(inputElement);
    section.appendChild(labelElement2);

    section.appendChild(inputElement2);


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

    LoadLogonExec();
}, 1800);

function zindexU() {
    let windows = document.querySelectorAll('.window');

    windows.forEach((myWindow, index) => {
        var highdex = getHpID();

        // Bring the active window to the front by setting a higher z-index
        const activeWindow = document.getElementById(highdex);

        windows.forEach((window) => {
            if (window.style.zIndex !== highdex) {
                const titleBar = window.querySelector('.title-bar');
                if (titleBar) {
                    titleBar.classList.add('inactive');
                }
                window.style.zIndex = 1; // Lower z-index for inactive windows
            }
        });

        if (activeWindow) {
            activeWindow.style.zIndex = windows.length; // Bring the active window to the front
            const activeTitleBar = activeWindow.querySelector('.title-bar');
            if (activeTitleBar) {
                activeTitleBar.classList.remove('inactive');
            }
        }
    });
}
