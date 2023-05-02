import src from "../images/ChromeKeyboard_Black_128.png";
import languages from "../languages";
import "./style.css";

const img = document.querySelector("#app img");

chrome.storage.sync.get(["status", "language"], (result) => {
    load(result);
});

function buttonClick(e) {
    console.log("clicked", e.target.id);
    e.target.textContent = e.target.classList.contains("active")
        ? "Turn Off"
        : "Turn On";
    e.target.classList.toggle("active");
    chrome.storage.sync.set({
        status: !e.target.classList.contains("active"),
    });
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
    const languageInput = document.getElementById("language-input");
    const languageTimer = document.getElementById("language-timer");
    const languageText = document.getElementById("language-text");
    const languageOpts = document.getElementById("language-options");

    statusBtn.classList.toggle("active", result.status);
    statusBtn.textContent = result.status ? "Turn On" : "Turn Off";
    statusBtn.addEventListener("click", buttonClick);

    currentText.textContent = languages[result.language].name;

    function clears() {
        clearTimeout(timer);
        clearInterval(interval);
    }

    languageInput.addEventListener("keyup", (e) => {
        clears();

        entries = Object.entries(languages[result.language].language).filter(
            ([key, val]) => {
                return key.startsWith(e.target.value);
            }
        );

        // interval = setInterval(() => {
        //     console.log("interval fire", count);
        //     languageTimer.style.width = `${(count / 3) * 100}%`;
        //     count--;
        //     if (count === 0) {
        //         clearInterval(interval);
        //         languageText.textContent += e.target.value;
        //         e.target.value = "";
        //         languageTimer.style.width = "100%";
        //         count = 3;
        //     }
        // }, 1000);

        languageOpts.innerHTML = entries
            .map(([key, val]) => {
                return `<span class="language-option">${val}<hr/>${key}</span>`;
            })
            .join("");
    });

    languageInput.addEventListener("keydown", (e) => {
        console.log(e.key);
        if (e.key === "Tab") {
            e.preventDefault();
            // clears();
            const match = entries.shift();
            console.log(match);
            languageText.textContent += match[1];
            languageInput.value = "";
        }

        if (e.key === "Delete") {
            console.log("delete!!!");
        }

        if (e.key === "Backspace") {
            console.log("Backspace!!!");
        }

        if (e.key === " ") {
            e.preventDefault();
            languageText.textContent += " ";
            languageInput.value = "";
        }
    });
}
