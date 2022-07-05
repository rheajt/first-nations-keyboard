export function LanguageKeycode({
    keyCode,
    val,
}: {
    keyCode: string;
    val: string;
}) {
    const codeLetters = keyCode.split("");

    return (
        <div className="language-keycode">
            {codeLetters.map((letter: string, idx: number) => (
                <span key={`${letter}-${idx}`} className="letter">
                    {letter}
                </span>
            ))}
            : <span>{val}</span>
        </div>
    );
}
