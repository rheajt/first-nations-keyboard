import src from "../images/ChromeKeyboard_Black_128.png";
import languages from "../languages";
import "./style.css";

const img = document.querySelector("#app img");

chrome.storage.sync.get(["status", "language"], (result) => {
    load(result);
});

async function getTabId() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

function printLanguageText(val) {
    document.activeElement.value += val;
}

async function buttonClick(e) {
    const languageText = document.getElementById("language-text");
    const currentTab = await getTabId();
    chrome.scripting
        .executeScript({
            target: { tabId: currentTab },
            func: printLanguageText,
            args: [languageText.value],
        })
        .then(() => console.log("injected a function"));
}

let textarea = "";

function load(result) {
    img.src = src;
    let timer;
    let interval;

    let complete = "";
    let working = "";

    let count = 3; // this is the time the countdown timer waits before accepting the top input

    let entries = [];

    const statusBtn = document.getElementById("status-btn");
    const currentText = document.getElementById("current-language");
    const languageText = document.getElementById("language-text");
    const languageOpts = document.getElementById("language-options");

    statusBtn.classList.toggle("active", result.status);
    // statusBtn.textContent = result.status ? "Turn On" : "Turn Off";
    statusBtn.addEventListener("click", buttonClick);

    currentText.textContent = languages[result.language].name;

    function clears() {
        clearTimeout(timer);
        clearInterval(interval);
    }

    const keys = Object.keys(languages[result.language].language).reduce(
        (acc, key) => {
            if (acc.includes(key[0])) return acc;
            acc.push(key[0]);
            return acc;
        },
        []
    );

    console.log(keys);

    languageText.addEventListener("keyup", (e) => {
        clears();
        entries = Object.entries(languages[result.language].language).filter(
            ([key, val]) => {
                return key.startsWith(working);
            }
        );

        languageOpts.innerHTML = entries
            .map(([key, val]) => {
                return `<span class="language-option">${val}<hr/>${key}</span>`;
            })
            .join("");
    });

    languageText.addEventListener("keydown", (e) => {
        e.preventDefault();

        if (keys.includes(e.key)) {
            working += e.key;
            languageText.value = complete + working;
        }

        if (e.key === "Tab") {
            e.preventDefault();
            // clears();
            const match = entries.shift();
            console.log(complete, match[1]);

            complete += match[1];
            working = "";
            languageText.value = complete;
            // languageText.textContent += match[1];
        }

        if (e.key === "Delete") {
            console.log("delete!!!", working);
        }

        if (e.key === "Backspace") {
            if (working.length > 0) {
                working = working.slice(0, -1);
                languageText.value = complete + working;
            } else {
                complete = complete.slice(0, -1);
                languageText.value = complete;
            }
        }

        if (e.key === " ") {
            working = "";
            complete += " ";
            languageText.value = complete;
        }
    });
}
