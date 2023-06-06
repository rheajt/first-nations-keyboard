// import src from "../images/ChromeKeyboard_Black_128.png";
import languages from "../languages";
// import { getTabId } from "./utils/getTabId";
import "./style.css";

chrome.storage.sync.get(["language"], (result) => {
    initLanguages(result);
});

chrome.storage.sync.onChanged.addListener((changes, namespace) => {
    console.log("onchange", changes.language.oldValue, changes.language.newValue);
    changeActiveLanguage(changes.language.newValue, "active");
    changeActiveLanguage(changes.language.oldValue, "active");
});

function makeDiv(label, id, active = false) {
    const div = document.createElement("div");
    div.id = id;
    div.innerHTML = label;
    div.classList.add("language");
    if (active) {
        div.classList.add("active");
    }

    div.addEventListener("click", async (e) => {
        console.log("clicked", e.currentTarget.id);
        // changeActiveLanguage(e.currentTarget.id, "active");
        chrome.storage.sync.set({ language: e.currentTarget.id });
    });

    return div;
}

function changeActiveLanguage(language, active) {
    const languageDiv = document.getElementById(language);
    languageDiv.classList.toggle(active);
}

function initLanguages(result) {
    const languagesDiv = document.getElementById("languages");
    const offDiv = makeDiv("Off", "off", result.language === "off");
    languagesDiv.appendChild(offDiv);

    Object.keys(languages).forEach((key) => {
        console.log("language keys", key);
        const langDiv = makeDiv(languages[key].name, key, key === result.language);
        languagesDiv.appendChild(langDiv);
    });
}
