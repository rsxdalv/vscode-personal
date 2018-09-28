export const cleanTask = x =>
    x
        .replace(/\[ANNOT[\s\S]*?\]/gm, '')
        .replace(/\n[\s\n]+/gm, '\n')
        .replace(/\[1 punkts\]|\s+$|^\n/gm, '')
        .replace(/\n[\s\n]+/gm, '\n')
        .replace(/   */g, ' ')
        .replace(/_{3,}/g, 'task_target')

export const cleanTaskAnswers = x =>
    x
        .replace(/\n[\s\n]+/gm, '\n')
        .replace(/^\n/gm, '')
        .replace(/^\d\.[\s\.]+/gm, '')
        .replace(/\.{2,} ?$/gm, '.')

const badSymbol = '​';
export const cleanQuokka = x =>
    x.replace(new RegExp(badSymbol, "g"), "")
