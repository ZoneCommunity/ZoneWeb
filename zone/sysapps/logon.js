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
    createWindow("LogonX", 300, 170, {
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
