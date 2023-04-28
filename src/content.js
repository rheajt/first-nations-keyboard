import src from "../images/ChromeKeyboard_Black_128.png";
import languages from "../languages";
import "./content.css";

const selectedLanguage = "ojibwe";
// let status = false;

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        // status = !!newValue;
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
    <h1>First Nations</h1>
    </header>

    <section>
        <p>${languages[selectedLanguage].description}</p>
        ${Object.entries(languages[selectedLanguage].language)
        .map(([key, value]) => {
            return `
                <p>
                    ${key}: ${value}
                </p>
            `;
        })
        .join("")}
    </section>
</div>
`;

const doc = new DOMParser().parseFromString(html, "text/html");

document.body.prepend(doc.body.firstElementChild);
