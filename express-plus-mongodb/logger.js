var lgr = {
	error: error,
	warning: warning,
	log: log
};

lgr.options = {
	errorSeparator:		'###################################################################',
	warningSeparator:	'===================================================================',
	logSeparator:		'-------------------------------------------------------------------',
	messagePrefix: '   | '
};

function error(title, description) {
	var time = new Date();
	var timeStamp = time.toLocaleDateString() + ' ' + time.toLocaleTimeString(); 
	var line1 = '[ERROR] '  + '<' + timeStamp + '>';
	var line2 = lgr.options.messagePrefix + 'title: ' + title;
	var line3 = lgr.options.messagePrefix + 'description: ' + description;
	var logString = [
		lgr.options.errorSeparator,
		'\n',
		line1,
		'\n',
		line2,
		'\n',
		line3,
		'\n',
		lgr.options.errorSeparator
	]
	console.log(logString.join(''));
}

function warning(title, description) {
	var time = new Date();
	var timeStamp = time.toLocaleDateString() + ' ' + time.toLocaleTimeString(); 
	var line1 = '[WARNING] '  + '<' + timeStamp + '>';
	var line2 = lgr.options.messagePrefix + 'title: ' + title;
	var line3 = lgr.options.messagePrefix + 'description: ' + description;
	var logString = [
		lgr.options.warningSeparator,
		'\n',
		line1,
		'\n',
		line2,
		'\n',
		line3,
		'\n',
		lgr.options.warningSeparator
	]
	console.log(logString.join(''));
}

function log(message) {
	var time = new Date();
	var timeStamp = time.toLocaleDateString() + ' ' + time.toLocaleTimeString(); 
	var line1 = '[LOG] '  + '<' + timeStamp + '>';
	var line2 = lgr.options.messagePrefix + message;
	var logString = [
		lgr.options.logSeparator,
		'\n',
		line1,
		'\n',
		line2,
		'\n',
		lgr.options.logSeparator
	]
	console.log(logString.join(''));
}


module.exports = lgr;