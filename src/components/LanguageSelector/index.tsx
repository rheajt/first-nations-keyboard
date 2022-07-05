//import { useState } from "react";
import languages, { Language } from "../../languages";
import { LanguageKeycode } from "./LanguageKeycode";

export function LanguageSelector({
    text,
    lang,
    setLang,
    sorted,
    current,
}: {
    text: string;
    lang: string;
    setLang: (lang: string) => void;
    sorted: string[];
    current: Language;
}) {
    return (
        <div className="sidebar">
            <select
                value={lang}
                onChange={(e) => setLang(e.target.value as string)}
            >
                {Object.keys(languages).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>

            {text.length === 0
                ? sorted.map((key) => {
                    return (
                        <LanguageKeycode
                            key={key}
                            keyCode={key}
                            val={current[key] as string}
                        />
                    );
                })
                : sorted
                    .filter((key) => key.startsWith(text))
                    .map((key) => {
                        return (
                            <LanguageKeycode
                                key={key}
                                keyCode={key}
                                val={current[key] as string}
                            />
                        );
                    })}
        </div>
    );
}
