const Fontmin = require('fontmin')
const fs = require('fs')
const path = require('path')
const fontConfigJson = require('./font.config.json')
try {
    // fontFile
    const fontFilePath = './fontFile'
    if(!fs.existsSync(path.join(process.cwd(), fontFilePath))) {
        throw 'please mkdir "fontFile" and put in the target .ttf file'
    }
    const fontFileDir = fs.readdirSync(fontFilePath)
    // only .ttf file
    const fonts = fontFileDir.filter((fd) => {
        let fileType = fd.split('.')
        fileType = fileType[fileType.length - 1]
        return fileType.toLowerCase() == 'ttf'
    })
    if (fonts.length < 1) throw 'no available .ttf file'

    const fontmin = new Fontmin()
        .src(fontFilePath + '/' + fonts[0]) // only transform the first one .ttf file
        .use(
            Fontmin.glyph({
                fontConfigJson,
            })
        )
        .dest('./output') // output File

    fontmin.run(function (err, files) {
        if (err) {
            throw err
        } else {
            console.log(
                'transform completed, new File has been generated in /output'
            )
        }
    })
} catch (err) {
    console.error(err)
}
