# Zero-Width Vanisher 👻

A psychological prank browser extension that turns the entire internet into a ghost town with a single click. 

Unlike encoders that replace text with scrambled symbols or hieroglyphs, this extension replaces every single text character on a webpage with a **Zero-Width Space (U+200B)**. The result? The website appears completely empty, but the underlying data remains invisible. 

It drives users crazy because they can still highlight empty rows, copy "nothing," and paste phantom characters into their text editors.

---

## 🔬 How it Works

The extension requests standard scripting permissions to safely traverse the active page's DOM tree. 

1. **Text Node Replacement:** It targets all raw `TEXT_NODE` elements and mirrors their exact character count using `\u200B`.
2. **Structural Protection:** It safely bypasses system-critical tags like `<script>`, `<style>`, `<input>`, and `<textarea>` so the webpage architecture doesn't break.
3. **Live Mutation Observer:** It deploys an active background listener that catches dynamic updates (like social feeds or live AI responses), rendering incoming text invisible in real-time.
4. **Infinite Loop Protection:** The script temporarily detaches its observer while wiping characters to prevent DOM-update cascading crashes.

---

## 💻 Installation & Deployment

### Desktop Browsers (Chrome, Brave, Edge, Opera)
1. Clone this repository or download the files (`manifest.json`, `popup.html`, `popup.js`) into a local directory named `Zero_Width_Vanisher`.
2. Open your browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode** via the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select your `Zero_Width_Vanisher` folder.

### Mobile Browsers (Android Client Environments)
Since stock mobile clients block directory deployments, you can run this script using extension-enabled environments like **Lemur Browser** or **Mises Browser**:
1. Package this repository into a standard `.zip` archive on your device.
2. Open your extension-supported browser app and enter the extensions manager panel.
3. Turn **Developer Mode** to **ON**.
4. Tap **"+ (from zip)"** or **"Local upload"** and load your archive.

---

## 🔒 Safety Statement
This script operates 100% locally within your client browser's isolated sandbox memory execution environment. It does not look at, monitor, collect, or transmit login states, cookies, session authentication tokens, or external network headers. It is purely designed as a local visual experiment and prank tool.
