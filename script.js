const html_code = document.querySelector('.html-code textarea');
const css_code = document.querySelector('.css-code textarea');
const js_code = document.querySelector('.js-code textarea');
const result = document.querySelector('#result');

function run() {
    // Storing data in Local Storage
    localStorage.setItem('html_code', html_code.value);
    localStorage.setItem('css_code', css_code.value);
    localStorage.setItem('js_code', js_code.value);

    // Executing HTML, CSS and JS code
    result.contentDocument.body.innerHTML = `<style>${localStorage.css_code}</style>` + localStorage.html_code;
    result.contentWindow.eval(localStorage.js_code);
}

// Checking if user is typing anything in input field
html_code.onkeyup = () => run();
css_code.onkeyup = () => run();
js_code.onkeyup = () => run();

// Accessing data stored in Local Storage.
html_code.value = localStorage.html_code;
css_code.value = localStorage.css_code;
js_code.value = localStorage.js_code;

document.getElementById('downloadBtn').addEventListener('click', function () {
    const folderName = prompt('Enter folder name:');
    if (!folderName) return;

    const htmlCode = document.querySelector('.html-code textarea').value;
    const cssCode = document.querySelector('.css-code textarea').value;
    const jsCode = document.querySelector('.js-code textarea').value;

    // Creating properly formatted HTML with linked CSS and JS
    const formattedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Downloaded Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
${htmlCode}
<script src="script.js"></script>
</body>
</html>`;

    const zip = new JSZip();
    const folder = zip.folder(folderName);

    folder.file('index.html', formattedHTML);
    folder.file('style.css', cssCode);
    folder.file('script.js', jsCode);

    zip.generateAsync({ type: 'blob' }).then(function (content) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = folderName + '.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

document.getElementById('openBtn').addEventListener('click', function() {
    document.getElementById('folderInput').click();
});

document.getElementById('folderInput').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    const htmlFile = files.find(file => file.name === 'index.html');
    const cssFile = files.find(file => file.name === 'style.css');
    const jsFile = files.find(file => file.name === 'script.js');
    
    if (htmlFile) {
        readFile(htmlFile, '.html-code textarea');
    }
    if (cssFile) {
        readFile(cssFile, '.css-code textarea');
    }
    if (jsFile) {
        readFile(jsFile, '.js-code textarea');
    }
});

function readFile(file, textareaSelector) {
    const reader = new FileReader();
    reader.onload = function(e) {
        document.querySelector(textareaSelector).value = e.target.result;
        // Trigger the run function to update the preview
        run();
    };
    reader.readAsText(file);
}

document.getElementById('clearBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all code editors?')) {
        // Clear all textareas
        html_code.value = '';
        css_code.value = '';
        js_code.value = '';
        
        // Clear localStorage
        localStorage.removeItem('html_code');
        localStorage.removeItem('css_code');
        localStorage.removeItem('js_code');
        
        // Update the preview
        run();
    }
});

//by Naren S J
//narensonu1520@gmail.com