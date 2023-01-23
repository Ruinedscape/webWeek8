var express = require('express');
const bcrypt = require("bcryptjs")
var router = express.Router();

let userList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/register', function(req, res) {
	let r = 0;
	for (let i=0; i<userList.length; i++) {
		if (req.body.username == userList[i].username) {
			r = 1;
			res.status(400).send("Username already in use");
			break;
		} else {
			r = 0;
		}
	}
	
	if (r == 0) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				let user = {
					id: userList.length,
					username: req.body.username,
					password: hash
				}
				userList.push(user);
			})
		})
		res.json("User registered");
		console.log(userList);
	}
});

router.get('/api/user/list', function(req, res) {
	res.send(userList);
});

module.exports = router;
