var _users = [
    {
        id: 1,
        username: 'saleh',
        password: 'khafan',
        firstName: 'Saleh',
        lastName: 'Yusef'
    },
    {
        id : 2,
        username: 'tahereh',
        password: 'k',
        firstName: 'tahereh',
        lastName: 'kasehpoor'
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