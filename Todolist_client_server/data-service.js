var fs = require('fs');

module.exports = {
	readUserData : readUserData,
	writeData: writeData
}

function readUserData(userId,cb,errFn) {
	fs.readFile('./storage.txt', function (err, content) {
		if (err) {
			console.log(err);
            errFn && errFn(err);
			return;
		}
		var data = JSON.parse(content);
		var userdata = data[userId];
        !userdata && (userdata = data[userId] = { id: userId });
        cb && cb (userdata,data);
	});
};
	
function writeData (data,cb,errFn){

	fs.writeFile('storage.txt', JSON.stringify(data), err => {
		if (err) {
			console.log(err);
			errFn && errFn(err);
			return;
		}
		cb && cb();
	});

};