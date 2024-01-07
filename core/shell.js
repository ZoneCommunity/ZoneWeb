console.log("Shell component loaded");
// you'll have to import stuff from ozfs.js thx

//shell loader
function LoadShell() {


    // zsprompt will be based on the fs. its user@computername / >  (/ is the current directory. for example, / or /home or /users/admin) (it would be 
    // user@computername newdrive:/ > if it was not on the drive zoneos is on)

    const zsout = document.createElement("div");
    zsout.id = "zsout";
    zsout.style.backgroundColor = "black";
    zsout.style.color = "white";
    zsout.style.overflowY = "auto";
    zsout.style.height = "0px";
    zsout.style.fontFamily = "Consolas, monospace";


    const zstextarea = document.createElement("div");
    zstextarea.id = "zstextarea";
    zstextarea.style.display = "flex";
    zstextarea.style.alignItems = "center";

    const zsinput = document.createElement("div");
    zsinput.id = "zsinput";
    zsinput.setAttribute("contenteditable", "true");
    zsinput.style.outline = "none";
    zsinput.style.color = "white";
    zsinput.style.fontFamily = "Consolas, monospace";
    zsinput.style.flex = "1";
    zsinput.setAttribute("autofocus", "true");

    // Create the zsprompt div
    const zsprompt = document.createElement("div");
    zsprompt.id = "zsprompt";
    zsprompt.textContent = "root@zone / >";
    zsprompt.style.color = "white";
    zsprompt.style.fontFamily = "Consolas, monospace";

    document.body.appendChild(zsout);
    document.body.appendChild(zstextarea);

    // load welcomer
    zsWelcomer();


    setTimeout(function () {
        zstextarea.appendChild(zsprompt);
        zstextarea.appendChild(zsinput);
        zsinput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                HandleInput(zsinput.textContent.trim());
                zsinput.textContent = "";
            }
        });
        document.addEventListener("mouseup", function () {
            const length = zsinput.textContent.length;
            zsinput.focus();
        });
    }, 2000);
}

function initFSX() {
    // initate fs. fs stored in ozfs.js

    // in the handleinput, there will be many file functions such as ls etc. this will work with commands like cd sys/apps (this for example would take the current-
    //- directory in the zsprompt. something that starts with a / like /users/admin would not use the current directory, but the current drive. something like-\
    //- cooldrive:/windows/system33 would not use the current directory or current drive (technically they could do zone:/ lol)
}

function initFS() {
    VFS.init();
  }
  

// welcomer
function zsWelcomer() {
    // welcome and loadshell will be modified to create a user account if one isnt already detected.
    appendToTerminal(" ");
    setTimeout(function () {
        appendToTerminal("Loading core utilities...");
    }, 500);
    setTimeout(function () {
        appendToTerminal("Checking system stability...");
    }, 1000);
    setTimeout(function () {
        appendToTerminal("Success, ZMC Kernel loaded!");
    }, 1500);
    setTimeout(function () {
        appendToTerminal("Loading shell.js ...");
    }, 1500);
    setTimeout(function () {
        appendToTerminal(" ");
        appendToTerminal("Welcome to ZoneOS!");
        appendToTerminal("You are currently in shell mode. To exit shell mode and load the GUI, type 'zone'");
        appendToTerminal(" ");
    }, 2000);
}

function LoadVenti() {
    const zsout = document.getElementById("zsout");
    const zstextarea = document.getElementById("zstextarea");
    zstextarea.parentNode.removeChild(zstextarea);


    setTimeout(function () {
        appendToTerminal("Saving session state...");
    }, 200);
    
    setTimeout(function () {
        appendToTerminal("Exiting user account...");
    }, 500);
    
    setTimeout(function () {
        appendToTerminal("Terminating processes...");
    }, 700);
    
    setTimeout(function () {
        appendToTerminal("Disabling shell...");
    }, 1000);
    
    setTimeout(function () {
        appendToTerminal("Entering zmc64 mode...");
    }, 1200);
    
    setTimeout(function () {
        appendToTerminal("Enabling venti UI framework...");
    }, 1700);
    
    setTimeout(function () {
        while (zsout.firstChild) {
            zsout.removeChild(zsout.firstChild);
        }
    }, 2000);

    setTimeout(function () {
        appendToTerminal("Checking system integrity");
    }, 2200);

    setTimeout(function () {
        appendToTerminal("System is stable");
    }, 2700);

    setTimeout(function () {
        appendToTerminal("Exiting native");
    }, 3200);

    setTimeout(function () {
        zsout.parentNode.removeChild(zsout);
    }, 3500);
    

    setTimeout(function () {
    const existingScript = document.querySelector('script[src="core/shell.js"]');

    // Create a new script element for ventiload.js
    const newScript = document.createElement('script');
    newScript.type = "module";
    newScript.src = 'core/ventiload.js';

    // Replace the existing script with the new script
    existingScript.parentNode.replaceChild(newScript, existingScript);
    }, 3500);

    
    // Remove the shell HTML elements
    // zsout.parentNode.removeChild(zsout);
}


// in here, you for mkfile you should add an easy way to make different extensions like .txt and .app etc so i can easily add code for opening those later.

// input handler
function HandleInput(input) {

    const zsout = document.getElementById("zsout");  
    const args = input.trim().split(/\s+/);
    const command = args[0].toLowerCase();
    const arg = args.slice(1).join(" "); // Join the arguments back together


    const promptParts = zsprompt.textContent.split(/\s+/);
    const currentPath = promptParts[1];

    const promptX = document.createElement("div");
    promptX.textContent = zsprompt.textContent + zsinput.textContent;
    zsout.appendChild(promptX);

    switch (command) {
        case "help":
            appendToTerminal("Available commands:");
            appendToTerminal(" - help: Display this help message");
            appendToTerminal(" - echo [message]: Display a message");
            appendToTerminal(" - clear: Clears the shell");
            appendToTerminal(" - ver: Shows information about the current ZoneOS version");
            appendToTerminal(" - zone: Exits the shell and loads the GUI");
            break;
        case "clear":
            zsout.innerHTML = "";
            zsout.style.height = "0px";
            zsout.scrollTop = zsout.scrollHeight;
            break;
        case "ver":
            appendToTerminal("ZoneOS 1.0 - ZMC Kernel - Early Testing Build - © ZoneCommunity 2020-2023");
            break;
        case "zone":
            LoadVenti()
            break;
        case "echo":
            displayEcho(args.slice(1).join(" "));
            break;
        case "ls":
            handleLsCommand(arg);
            break;
        
        case "mkdir":
            handleMkdirCommand(args.slice(1).join(" "));
            break;

        case "mkfile":
            handleMkfileCommand(args.slice(1).join(" "));
            break;

        case "rm":
            handleRmCommand(args.slice(1).join(" "));
            break;

        case "rn":
            handleRnCommand(args.slice(1).join(" "));
            break;

        case "cp":
            handleCopyCommand(args.slice(1).join(" "));
            break;

        case "cd":
            handleCdCommand(args.slice(1).join(" "));
            break;

        default:
        appendToTerminal("Command not found. Type 'help' for a list of commands.");
    }

    appendToTerminal(" ");
    }

function appendToTerminal(command) {
    const zsout = document.getElementById("zsout");
    const newLine = document.createElement("div");
    newLine.textContent = command;
    newLine.innerHTML += "&nbsp;";

    zsout.appendChild(newLine);
    zsout.style.height = zsout.scrollHeight + "px";
    zsout.scrollTop = zsout.scrollHeight;
}

function displayEcho(message) {
    appendToTerminal(message);
} 

// Update the handleCdCommand function
function handleCdCommand(arg) {

}

  
// Modify the handleLsCommand function
function handleLsCommand(arg) {


}



  

// first boot
LoadShell();