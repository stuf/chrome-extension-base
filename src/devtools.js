const title = 'My Extension';
const iconPath = '';
const pagePath = 'panel.html';
const callback = () => {};

chrome.devtools.panels.create(title, iconPath, pagePath, callback);
