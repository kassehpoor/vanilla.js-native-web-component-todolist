var _users = [
    {
        id: 1,
        username: 'saleh',
        password: 'khafan',
        firstName: 'Saleh',
        lastName: 'Yusef'
    }
];

exports.authenticate = function (username, password) {
    var user = _users.find(u => u.username === username && u.password === password);
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
    }
}