var defaultComponent = "ventiLoad"; // or "ventiLoad" or "shell"

// shell is broken when booting to venti

// Dynamically create a script element to load the selected component
var scriptElement = document.createElement("script");
scriptElement.type = "module";
scriptElement.src = "core/" + defaultComponent + ".js";

// Append the script element to the body to trigger the loading
document.body.appendChild(scriptElement);