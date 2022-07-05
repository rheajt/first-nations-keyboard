import ojiCree from "./oji-cree";
import ojibwe from "./ojibwe";

export interface Language {
    [key: string]: string;
}

export interface Languages {
    ojiCree: Language;
    ojibwe: Language;
}

export default {
    ojiCree,
    ojibwe,
} as Languages;
