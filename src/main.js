import src from "../images/ChromeKeyboard_Black_128.png";
import languages from "../languages";
import "./style.css";

const app = document.querySelector("#app");
let selectedLanguage = "ojibwe";

app.innerHTML = `
    <img src="${src}" alt="first nations keyboard extension" />

    <div>
        <label id="label-toggle" for="input-toggle">Turn</label>
        <input type="checkbox" id="input-toggle" />
    </div>

    <fieldset>
    <legend>Select a language:</legend>

    ${Object.entries(languages)
        .map(([key, value]) => {
            return `
            <div>
                <input type="radio" id="${key}" name="selected-language" value="${key}">
                <label for="${key}">${value.name}</label>
            </div>
        `;
        })
        .join("")}

    </fieldset>
`;

const toggle = document.getElementById("input-toggle");
const label = document.getElementById("label-toggle");
const languageRadios = document.querySelectorAll("input[type=radio]");

let status = false;

toggle.addEventListener("click", () => {
    status = !status;
    console.log(`Turn ${status ? "off" : "on"}`);
    label.textContent = `Turn ${status ? "off" : "on"}`;

    chrome.storage.sync.set({ status });
});

languageRadios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
        console.log(e.target.value);
        selectedLanguage = e.target.value;
        chrome.storage.sync.set({ language: e.target.value });
    });
});
