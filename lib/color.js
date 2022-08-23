const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const FadlyLog = (text, color) => {
	return !color ? chalk.greenBright('[ FADLY ID ] ') + chalk.magentaBright(text) : chalk.greenBright('[ FADLY ID ] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
    FadlyLog
}
