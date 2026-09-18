document.getElementById('vanish-btn').addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    statusDiv.innerText = "Vanishing text...";
    
    // Holt den aktuell geöffneten Tab im Browser
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
        statusDiv.innerText = "Error: No active tab.";
        return;
    }

    // Injiziert das Skript direkt in die geöffnete Webseite
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const ZWSP = '\u200B';

            // Ersetzt die sichtbaren Zeichen durch unsichtbare ZWSP-Blöcke
            function vanish(text) {
                if (!text.trim()) return text;
                return ZWSP.repeat(text.length);
            }

            // Durchläuft rekursiv alle Textknoten der Seite
            function processDOM(node) {
                const ignoredTags = ['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'NOSCRIPT', 'IFRAME'];
                if (node.parentElement && ignoredTags.includes(node.parentElement.tagName)) {
                    return;
                }

                if (node.nodeType === Node.TEXT_NODE) {
                    const currentText = node.nodeValue;
                    // Nur verändern, wenn Inhalt da ist und er nicht schon unsichtbar ist
                    if (currentText.trim() && !/^[\u200B]+$/.test(currentText)) {
                        node.nodeValue = vanish(currentText);
                    }
                } else {
                    for (let child of node.childNodes) {
                        processDOM(child);
                    }
                }
            }

            // 1. Durchlauf: Versteckt den aktuellen Text auf der Seite
            processDOM(document.body);

            // 2. Durchlauf: Observer fängt dynamisch nachladenden Text (Chats, Feeds) ab
            const observer = new MutationObserver((mutationsList) => {
                // Kurz abschalten, um eine unendliche Schleife beim Schreiben zu verhindern
                observer.disconnect();

                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => processDOM(node));
                    } else if (mutation.type === 'characterData') {
                        processDOM(mutation.target);
                    }
                }

                // Wieder einschalten
                startObserving();
            });

            function startObserving() {
                observer.observe(document.body, {
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }

            startObserving();
        }
    }, () => {
        statusDiv.innerText = "The internet is a ghost town! 👻";
    });
});
