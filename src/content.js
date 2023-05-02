import src from "../images/ChromeKeyboard_Black_128.png";
import languages from "../languages";
import "./content.css";

const selectedLanguage = "ojibwe";
let status = false;
let language = "Ojibwe";

chrome.storage.sync.get(["status", "language"], (result) => {
    console.log("loaded", result);
    status = result.status;
    language = result.language;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === "language") {
            document.getElementById("language-name").textContent =
                languages[newValue].toUpperCase();
            document.getElementById("language-list").innerHTML = Object.entries(
                languages[newValue].language
            )
                .map(([key, value]) => {
                    return `
                    <p>
                        ${key}: ${value}
                    </p>
                `;
                })
                .join("");
        }
        toggleSidebar(!!newValue);
    }
});

function toggleSidebar(status) {
    document
        .getElementById("first-nations-sidebar")
        .classList.toggle("show", status);
}

const html = `
<div id="first-nations-sidebar">
    <header>
    <img src="${chrome.runtime.getURL(
    src
)}" alt="first nations keyboard extension" />
    <h1 id="language-name">${language.toUpperCase()}</h1>
    </header>

    <section>
        <p id="language-description">${languages[selectedLanguage].description
    }</p>
        <div id="language-list">
            ${Object.entries(languages[selectedLanguage].language)
        .map(([key, value]) => {
            return `
                    <p>
                        ${key}: ${value}
                    </p>
                `;
        })
        .join("")}
        </div>
    </section>
</div>
`;

const doc = new DOMParser().parseFromString(html, "text/html");

document.body.prepend(doc.body.firstElementChild);
