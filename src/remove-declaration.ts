import * as RA from "@rsxlv/ramda-personal-adjunct";
import * as R from "ramda";
import * as ts from "typescript";
import * as fs from "fs";

export const removeDeclaration = str => R.pipe(
    str => ts.createSourceFile("someFileName.ts", str, ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS),
    R.prop("statements"),
    R.filter(R.pathSatisfies(
        R.contains(R.__, ["level", "template", "clues", "answers", "items", "questions", "textTree"]),
        [
            "declarationList",
            "declarations",
            0,
            "name",
            "escapedText"
        ],
    )),
    R.map(R.pick(["pos", "end"])),
    R.sortBy(R.prop("pos")),
    R.reverse,
    R.reduce((p, c) =>
        R.converge(R.concat, [
            R.take(c.pos),
            R.drop(c.end),
        ])(p), str),
    R.tap(console.log)
)(str)
