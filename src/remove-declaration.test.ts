import * as RA from "@rsxlv/ramda-personal-adjunct";
import * as R from "ramda";
import * as ts from "typescript";
import * as fs from "fs";
import { removeDeclaration } from "./remove-declaration";

export const removeDeclarationTest = () => {

    const str = `
    import { placeActions } from "../../level-utils/Place/place-action-factory";
    export const level = 7;
    
    export const Actions = placeActions(level);
    
    export const images = {};
    
    export const items = [
        { id: 0, text: "gods" },
        { id: 1, text: "godi" },
        { id: 2, text: "saldums" },
        { id: 3, text: "saldumi" },
        { id: 4, text: "zaļums" },
        { id: 5, text: "zaļumi" },
        { id: 6, text: "zāle" },
        { id: 7, text: "zāles" },
    ];
    
    export const questions = [
        { id: 0, answer: 6, text: "zālaugi" },
        { id: 1, answer: 7, text: "medikamenti" },
        { id: 2, answer: 4, text: "īpašība (zaļš)" },
        { id: 3, answer: 5, text: "garšaugi (dilles, lociņi u.c.)" },
        { id: 4, answer: 0, text: "morālā vērtība" },
        { id: 5, answer: 1, text: "svinības" },
        { id: 6, answer: 2, text: "īpašība (salds)" },
        { id: 7, answer: 3, text: "konditorejas izstrādājumi" },
    ];
    
    export const INITIAL_STATE = {
        items, questions,
    };
    `;
    
    removeDeclaration(str);
}
