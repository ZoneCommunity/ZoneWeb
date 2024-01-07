import { getHpID } from '/zone/zmc64/idHandler.js';

// Function to set up event listeners for a specific window element
function WindowTracking(myWindow) {
    const titleBar = myWindow.querySelector('.title-bar');
    if (!titleBar) {
        return; // Skip this window if it doesn't have a title bar
    }

    let activeWindow = null;
    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY, resizeDirection;

    myWindow.addEventListener('mousedown', (e) => {
        // Bring the active window to the front by setting a higher z-index
        activeWindow = myWindow;

        // Update z-index for other windows
        document.querySelectorAll('.window').forEach((window) => {
            if (window !== activeWindow) {
                const titleBar = window.querySelector('.title-bar');
                
                if (titleBar) {
                    titleBar.classList.add('inactive');
                    window.classList.add('inactive');
                }
                window.style.zIndex = 1; // Lower z-index for inactive windows
            }
        });

        // Bring the active window to the front
        activeWindow.style.zIndex = document.querySelectorAll('.window').length;
        activeWindow.querySelector('.title-bar').classList.remove('inactive');
        activeWindow.classList.remove('inactive');
    });

    titleBar.addEventListener('mousedown', (e) => {
        try {
            if (e.target.closest('.title-bar') && !e.target.closest('button')) {
                activeWindow = myWindow;
                isDragging = true;

                offsetX = e.clientX - activeWindow.getBoundingClientRect().left;
                offsetY = e.clientY - activeWindow.getBoundingClientRect().top;
            }
        } catch (err) {}
    });

    const resizeHandles = myWindow.querySelectorAll('.resize-handle');
    resizeHandles.forEach((resizeHandle) => {
        resizeHandle.addEventListener('mousedown', (e) => {
            try {
                if (e.target.closest('.resize-handle')) {
                    activeWindow = myWindow;
                    isResizing = true;
                    offsetX = e.clientX;
                    offsetY = e.clientY;

                    // Determine resize direction based on the handle's classes
                    if (resizeHandle.classList.contains('top')) {
                        resizeDirection = 'top';
                    } else if (resizeHandle.classList.contains('bottom')) {
                        resizeDirection = 'bottom';
                    } else if (resizeHandle.classList.contains('left')) {
                        resizeDirection = 'left';
                    } else if (resizeHandle.classList.contains('right')) {
                        resizeDirection = 'right';
                    } else if (resizeHandle.classList.contains('top-left')) {
                        resizeDirection = 'top-left';
                    } else if (resizeHandle.classList.contains('top-right')) {
                        resizeDirection = 'top-right';
                    } else if (resizeHandle.classList.contains('bottom-left')) {
                        resizeDirection = 'bottom-left';
                    } else if (resizeHandle.classList.contains('bottom-right')) {
                        resizeDirection = 'bottom-right';
                    }
                }
            } catch (err) {}
        });
    });

    const minimizeButton = myWindow.querySelector('[aria-label="Minimize"]');
    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            myWindow.style.display = 'none';
        });
    }

    const maximizeButtons = myWindow.querySelectorAll('[aria-label="Maximize"]');
    let isMaximized = new Map(); // Map to track the maximized state for each window
    let storedWindowPositions = new Map(); // Map to store window positions before maximizing

    maximizeButtons.forEach((maximizeButton, index) => {
        maximizeButton.addEventListener('click', (event) => {
            const windowId = maximizeButton.closest('.window').id;
            const myWindow = document.getElementById(windowId);

            if (!myWindow) {
                return;
            }

            if (isMaximized.has(windowId) && isMaximized.get(windowId)) {
                // Restore the window to its previous position and size
                const storedPosition = storedWindowPositions.get(windowId);

                myWindow.style.left = storedPosition.left;
                myWindow.style.top = storedPosition.top;
                myWindow.style.width = storedPosition.width;
                myWindow.style.height = storedPosition.height;

                isMaximized.set(windowId, false);
                maximizeButton.setAttribute('aria-label', 'Maximize');
            } else {
                // Maximize the window
                storedWindowPositions.set(windowId, {
                    left: myWindow.style.left,
                    top: myWindow.style.top,
                    width: myWindow.style.width,
                    height: myWindow.style.height,
                });

                myWindow.style.left = '0';
                myWindow.style.top = '0';
                myWindow.style.width = '100%';
                myWindow.style.height = '100%';

                isMaximized.set(windowId, true);
                maximizeButton.setAttribute('aria-label', 'Restore');
            }
        });
    });

    const closeButton = myWindow.querySelector('[aria-label="Close"]');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (myWindow && myWindow.parentNode) {
                // Remove the window state from the map when closing the window
                delete myWindow.dataset.windowState;
                myWindow.parentNode.removeChild(myWindow);
            }
        });
    }

    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false;
        activeWindow = null;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && activeWindow) {
            const maximizeButton = activeWindow.querySelector('[aria-label="Restore"]');
            if (!maximizeButton) {
                activeWindow.style.left = e.clientX - offsetX + 'px';
                activeWindow.style.top = e.clientY - offsetY + 'px';
            }
        }

        if (isResizing && activeWindow) {
            const deltaX = e.clientX - offsetX;
            const deltaY = e.clientY - offsetY;
            let currentWidth, currentHeight, newWidth, newHeight, newLeft, newTop, newLeftPosition, newTopPosition;

            switch (resizeDirection) {
                case 'top':
                    currentHeight = parseFloat(activeWindow.style.height);
                    newHeight = Math.max(0, currentHeight - deltaY);
                    newTop = parseFloat(activeWindow.style.top) || 0;
                    newTopPosition = newTop + deltaY;
                    activeWindow.style.height = `${newHeight}px`;
                    activeWindow.style.top = `${newTopPosition}px`;
                    break;
                case 'bottom':
                    currentHeight = parseFloat(activeWindow.style.height);
                    newHeight = Math.max(0, currentHeight + deltaY);
                    activeWindow.style.height = `${newHeight}px`;
                    break;
                case 'left':
                    currentWidth = parseFloat(activeWindow.style.width);
                    newWidth = Math.max(0, currentWidth - deltaX);
                    newLeft = parseFloat(activeWindow.style.left) || 0;
                    newLeftPosition = newLeft + deltaX;
                    activeWindow.style.width = `${newWidth}px`;
                    activeWindow.style.left = `${newLeftPosition}px`;
                    break;
                case 'right':
                    currentWidth = parseFloat(activeWindow.style.width);
                    newWidth = Math.max(0, currentWidth + deltaX);
                    activeWindow.style.width = `${newWidth}px`;
                    break;
                case 'top-left':
                    currentWidth = parseFloat(activeWindow.style.width);
                    currentHeight = parseFloat(activeWindow.style.height);
                    newWidth = Math.max(0, currentWidth - deltaX);
                    newHeight = Math.max(0, currentHeight - deltaY);
                    newLeft = parseFloat(activeWindow.style.left) || 0;
                    newTop = parseFloat(activeWindow.style.top) || 0;
                    newLeftPosition = newLeft + deltaX;
                    newTopPosition = newTop + deltaY;
                    activeWindow.style.width = `${newWidth}px`;
                    activeWindow.style.height = `${newHeight}px`;
                    activeWindow.style.left = `${newLeftPosition}px`;
                    activeWindow.style.top = `${newTopPosition}px`;
                    break;
                case 'top-right':
                    currentWidth = parseFloat(activeWindow.style.width);
                    currentHeight = parseFloat(activeWindow.style.height);
                    newWidth = Math.max(0, currentWidth + deltaX);
                    newHeight = Math.max(0, currentHeight - deltaY);
                    newTop = parseFloat(activeWindow.style.top) || 0;
                    newTopPosition = newTop + deltaY;
                    activeWindow.style.width = `${newWidth}px`;
                    activeWindow.style.height = `${newHeight}px`;
                    activeWindow.style.top = `${newTopPosition}px`;
                    break;
                case 'bottom-left':
                    currentWidth = parseFloat(activeWindow.style.width);
                    currentHeight = parseFloat(activeWindow.style.height);
                    newWidth = Math.max(0, currentWidth - deltaX);
                    newHeight = Math.max(0, currentHeight + deltaY);
                    newLeft = parseFloat(activeWindow.style.left) || 0;
                    newLeftPosition = newLeft + deltaX;
                    activeWindow.style.width = `${newWidth}px`;
                    activeWindow.style.height = `${newHeight}px`;
                    activeWindow.style.left = `${newLeftPosition}px`;
                    break;
                case 'bottom-right':
                    currentWidth = parseFloat(activeWindow.style.width);
                    currentHeight = parseFloat(activeWindow.style.height);
                    newWidth = Math.max(0, currentWidth + deltaX);
                    newHeight = Math.max(0, currentHeight + deltaY);
                    activeWindow.style.width = `${newWidth}px`;
                    activeWindow.style.height = `${newHeight}px`;
                    break;
                default:
                    break;
            }
            offsetX = e.clientX;
            offsetY = e.clientY;
        }
    });
}

// Function to be executed when new content is added
function onContentAdded(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((addedNode) => {
                if (addedNode.nodeType === 1 && addedNode.classList.contains('window')) {
                    WindowTracking(addedNode);
                }
            });
        }
    }
}

// Create a MutationObserver instance
const observer = new MutationObserver(onContentAdded);

// Specify the target node and options for the observer
const targetNode = document.body;
const config = { childList: true, subtree: true };

observer.observe(targetNode, config);

// Call WindowTracking on existing windows
document.querySelectorAll('.window').forEach(WindowTracking);
