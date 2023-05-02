import src from "../images/ChromeKeyboard_Black_128.png";
import languages from "../languages";
import "./content.css";

chrome.storage.sync.get(["status", "language"], (result) => {
    console.log("loaded content", result.status, result.language);
});

chrome.storage.onChanged.addListener((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === "status") {
            console.log(newValue);
        }
    }
});
