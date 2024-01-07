console.log("Venti UI framework is now loading");

// Function to link stylesheets
function linkStylesheet(href) {
    var linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = href;
    document.head.appendChild(linkElement);
}

// Link the 98.css stylesheet
linkStylesheet("/zone/ui/base.css");

// https://unpkg.com/98.css

function BootScreen() {
        // Create a central loading element
        const loadingElement = document.createElement("div");
        loadingElement.id = "loading-element";
        loadingElement.style.position = "fixed";
        loadingElement.style.top = "50%";
        loadingElement.style.left = "50%";
        loadingElement.style.transform = "translate(-50%, -50%)";
        loadingElement.style.textAlign = "center";
        loadingElement.style.color = "white";
    
        // Add a logo
        const logoElement = document.createElement("img");
        logoElement.src = "../zone/assets/ZC_Logo_White.png"; 
        logoElement.style.width = "150px"; 
        logoElement.style.height = "150px"; 
    
        // Add a loading bar container with full-size transparency
        const loadingBarContainer = document.createElement("div");
        loadingBarContainer.id = "loading-bar-container";
        loadingBarContainer.style.width = "200px";
        loadingBarContainer.style.height = "5px";
        loadingBarContainer.style.marginTop = "20px"; // Adjust the top margin
        loadingBarContainer.style.background = "rgba(255, 255, 255, 0.2)"; // Transparent white background
        loadingBarContainer.style.borderRadius = "10px";
        loadingBarContainer.style.overflow = "hidden";
    
        // Add a loading bar
        const loadingBarElement = document.createElement("div");
        loadingBarElement.id = "loading-bar";
        loadingBarElement.style.width = "0%"; // Initial width
        loadingBarElement.style.height = "100%";
        loadingBarElement.style.background = "white"; // White loading bar color
        loadingBarElement.style.borderRadius = "10px";
        loadingBarElement.style.transition = "width 0.5s ease"; // Smooth animation
    
        loadingBarContainer.appendChild(loadingBarElement);
        loadingElement.appendChild(logoElement);
        loadingElement.appendChild(loadingBarContainer);
        document.body.appendChild(loadingElement);
    
        let progress = 0;
        const interval = setInterval(function () {
            progress += 5;
            loadingBarElement.style.width = `${progress}%`;
    
            if (progress >= 100) {
                clearInterval(interval);
                loadingElement.parentNode.removeChild(loadingElement);

                setTimeout(function () {
                    linkStylesheet("/zone/ui/login.css");

                    var scriptElement = document.createElement("script");
                    scriptElement.type = "module";
                    scriptElement.src = "zone/userenv/venti.js";
                    document.body.appendChild(scriptElement);
                }, 500);
            }
        }, 200);
}

// Function to create a window
function Windower(processID, title) {
    var windowElement = document.createElement("div");
    windowElement.classList.add("window");
    windowElement.id = processID;
    windowElement.style.width = "300px";
    windowElement.style.position = "absolute";
    windowElement.style.userSelect = "none";
    windowElement.style.height = "170px";

    windowElement.style.overflow = "hidden";
    windowElement.style.top = "50%";
    windowElement.style.left = "50%";

    var windowHeader = document.createElement("div");
    windowHeader.classList.add("title-bar");

    var windowHContent = document.createElement("div");
    windowHContent.classList.add("title-bar-text");
    windowHContent.textContent = title;

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

    windowContent.appendChild(inputB);
    windowContent.appendChild(inputB2);
    windowContent.appendChild(section);
    section.appendChild(loginBtn);

    inputB.appendChild(labelElement);
    inputB.appendChild(inputElement);
    inputB2.appendChild(labelElement2);
    inputB2.appendChild(inputElement2);

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
}


BootScreen();