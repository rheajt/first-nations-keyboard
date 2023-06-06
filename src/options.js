import languages from "../languages";
import "./options.css";

chrome.storage.sync.get(["language"], (result) => {
    load(result);
});

function load(result) {
    const langSelect = document.getElementById("languages");

    langSelect.defaultValue = result.language;
    langSelect.innerHTML += Object.entries(languages)
        .map(
            ([key, value]) => `
            <option value="${key}" ${key === result.language ? "selected" : ""
                }>${value.name}</option>
        `
        )
        .join("");

    langSelect.addEventListener("change", (e) => {
        console.log(e.target.value);
        chrome.storage.sync.set({ language: e.target.value });
    });
}
