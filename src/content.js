import languages from "../languages";

let setLanguage = "off";
let working = "";
let text = "";

document.addEventListener("keydown", (e) => {
    if (setLanguage === "off") {
        working = "";
        return;
    }

    e.preventDefault();

    if (e.key === "Tab") {
        console.log("tab");
    }

    if (e.key === "Delete") {
        console.log("delete!!!");
    }

    if (e.key === "Backspace") {
        console.log("backspace");
        text = text.slice(0, -1);
    }

    if (e.key === " ") {
        console.log("space bar");
        text += " ";
    }

    if (/^[a-zA-Z]+$/.test(e.key)) {
        working += e.key;

        let intended = languages[setLanguage].language[working];

        if (intended) {
            text = text.substring(0, text.length - 1) + intended;
        } else {
            working = "";
            intended = languages[setLanguage].language[e.key] || "";
            text += intended;
        }
    }

    document.activeElement.value = text;
});

chrome.storage.sync.get(["language"], (result) => {
    setLanguage = result.language;
    console.log(setLanguage);
});

chrome.storage.onChanged.addListener(({ language: { newValue: language } }) => {
    setLanguage = language;
    console.log(setLanguage);
});
