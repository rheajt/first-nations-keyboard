import { ChangeEvent, useState } from "react";

import { LanguageSelector } from "./components/LanguageSelector";
import "./App.css";
import languages from "./languages";

function App() {
    const [isOpen, setOpen] = useState(true);
    const [text, setText] = useState("");
    const [converted, setConverted] = useState("");
    const [lang, setLang] = useState<"ojibwe" | "ojiCree">("ojibwe");

    const current = languages[lang];
    const sorted = Object.keys(current).sort((a, b) => {
        return a.localeCompare(b);
    });

    let timer: NodeJS.Timeout;

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const val = event.target.value;
        console.log(val, current[val]);
        setText(val);

        if (val === " ") {
            setConverted(converted + current[val] + " ");
            setText("");
        }

        if (val.length >= 1) {
            console.log("start timer countdown");
            clearTimeout(timer);
            timer = setTimeout(() => {
                console.log("with ", val);
                setConverted(converted + current[val]);
                setText("");
            }, 2000);
        }

        //if(!current[event.target.value]) return ;
    }

    return (
        <div className="container">
            <div className="example">
                <HelpText />
                <input
                    value={text}
                    onChange={handleChange}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(true)}
                />
                <p>Text: {text}</p>
                <p onClick={() => setConverted("")}>Converted: {converted}</p>
            </div>

            {isOpen && (
                <LanguageSelector
                    text={text}
                    lang={lang}
                    setLang={(val) => setLang(val as any)}
                    current={current}
                    sorted={sorted}
                />
            )}
        </div>
    );
}

export default App;

function HelpText() {
    return (
        <>
            <p>
                Trying to create a tool that leverages input elements in a
                webpage. Allows for typing languages that have lots of layered
                elements. Currently Supports:
            </p>
            <ul>
                <li>Ojibwe</li>
                <li>OjiCree</li>
            </ul>
            <p>
                This is a work in progress. Currently trying to get the basic
                implementation down. Should accomplish the following:
            </p>
            <ul>
                <li>
                    Can type in an input and create text with the languages
                    above.
                </li>
            </ul>
        </>
    );
}
