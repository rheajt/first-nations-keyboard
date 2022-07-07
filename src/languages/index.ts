import ojiCree from "./oji-cree";
import ojibwe from "./ojibwe";

export interface Language {
    [key: string]: string;
}

export interface Languages {
    ojiCree: Language;
    ojibwe: Language;
}

const languages: Languages = {
    ojiCree,
    ojibwe,
};

export default languages;
