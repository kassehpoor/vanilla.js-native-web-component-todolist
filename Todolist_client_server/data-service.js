var fs = require('fs');

module.exports = {
	readData : readData,
	writeData: writeData
}

function readData(userId,cb,errFn) {
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