## Frontend Code Editor
- This is a simple, real-time frontend code editor built using HTML, CSS, and vanilla JavaScript. It allows users to input HTML, CSS, and JavaScript code in separate panes and instantly see the live output in an adjacent preview pane.

- The editor is designed to be fully responsive, switching from a two-column desktop layout to a stacked, scrollable mobile layout when the screen width is 600px or less.

- JavaScript Functionality (script.js)
The core logic of the application resides in the script.js file, managing the user input, live rendering, and data persistence.

1. Code Execution (run() function)
The run() function is the central piece of the application. It performs three main tasks:

- Persistence: It saves the content of the three <textarea> elements (HTML, CSS, JS) into the browser's localStorage every time it's called. This ensures the user's work is preserved even if the page is refreshed.

localStorage.setItem('html_code', html_code.value);
// ... for css_code and js_code

- Rendering HTML/CSS: It constructs the entire content of the iframe (#result). It wraps the CSS content in a <style> tag and prepends it to the HTML content before injecting it into the iframe's body.

- result.contentDocument.body.innerHTML = 
    `<style>${localStorage.css_code}</style>` + localStorage.html_code;

- Executing JavaScript: It executes the JavaScript code using result.contentWindow.eval(). By running eval() on the iframe's window context, the JS code has access to the rendered HTML/CSS elements within the preview pane.

2. Live Update Mechanism
The editor updates in real-time as the user types:

Event listeners (onkeyup) are attached to each of the three <textarea> elements.

Every time a key is released (onkeyup), the run() function is immediately called, updating the localStorage and refreshing the iframe preview.

3. Data Loading
On initial page load, the script attempts to retrieve any previously saved code from localStorage and populate the respective <textarea> fields. The run() function is then called immediately to render this saved code.

// Load saved code
html_code.value = localStorage.html_code;
// ... for css_code and js_code

## Developer Contact
- Naren S J
- narensonu1520@gmail.com
- 8296833381
