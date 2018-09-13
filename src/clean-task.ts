export const cleanTask = x =>
    x
        .replace(/\[ANNOT[\s\S]*?\]/gm, '')
        .replace(/\n[\s\n]+/gm, '\n')
        .replace(/\[1 punkts\]|\s+$|^\n/gm, '')
        .replace(/\n[\s\n]+/gm, '\n')
        .replace(/   */g, ' ')
        .replace(/_{3,}/g, 'task_target')

const badSymbol = '​';
export const cleanQuokka = x =>
    x.replace(new RegExp(badSymbol, "g"), "")
