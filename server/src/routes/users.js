import express from 'express';
import md5 from 'md5';
import db from '../../db.js';

const router = express.Router();
router.post('/create', (req, res, next) => {
    var userId = '';
    userId = md5((userId.concat(req.body.firstName, req.body.lastName, req.body.dob)).toLowerCase().replace(/ /g, ""))
    req.body._id = userId
    db.getDb()
        .db()
        .collection('users')
        .insertOne(req.body)
        .then(result => {
            res.status(201).json({
                id: result.insertedId,
                message: "successfully created new user",
                name: result.ops[0].firstName
            });
        })
        .catch(err => {
            console.log(err);
            if (err.code == 11000) {
                res.status(500).json({
                    message: "User Already Exists"
                });
            }

        });
});
router.post('/update/:id', (req, res, next) => {
    db.getDb()
        .db()
        .collection('users')
        .updateOne({
            _id: req.params.id
        }, {
            $set: req.body
        })
        .then(result => {
            if (result.matchedCount == 1 && result.modifiedCount == 1) {
                res.status(201).json({
                    message: "successfully updated",
                });
            } else if (result.matchedCount == 1 && result.modifiedCount == 0) {
                res.status(200).json({
                    message: "No Change In Existing Data",
                });
            } else if (result.matchedCount == 0 && result.modifiedCount == 0) {
                res.status(200).json({
                    message: "User Not Found or Invalid User Id",
                });
            }

        })
        .catch(err => {
            console.log("\n\n\n", err, "\n\n\n");
            res.status(500).json({
                message: "Internal Server Error"
            });

        });
});
router.get('/all', (req, res, next) => {
    const allUsers = [];
    db.getDb()
        .db()
        .collection('users')
        .find()
        .forEach(users => {
            allUsers.push(users);
        })
        .then(result => {
            if (allUsers) {
                res.status(200).json({
                    userCount: allUsers.length,
                    users: allUsers
                });
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.get('/all/names', (req, res, next) => {
    const allUsers = [];
    db.getDb()
        .db()
        .collection('users')
        .find().project({
            firstName: 1
        })
        //.limit(1)
        .forEach(users => {
            allUsers.push(users);
        })
        .then(result => {
            if (allUsers) {
                res.status(200).json({
                    userCount: allUsers.length,
                    users: allUsers
                });
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.get('/lazyload/name/:startsWith', (req, res, next) => {
    const allUsers = [];
    var myRegEx = new RegExp('^' + req.params.startsWith, 'i')
    db.getDb()
        .db()
        .collection('users')
        .find({
            firstName: myRegEx
        }).project({
            'firstName': 1,
            'image.thumbnail': 2
        })
        //.limit(10)
        .forEach(users => {
            allUsers.push(users);
        })
        .then(result => {
            if (allUsers) {
                res.status(200).json({
                    userCount: allUsers.length,
                    users: allUsers
                });
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.get('/lazyload/familyName/:startsWith', (req, res, next) => {
    const allUsers = [];
    var myRegEx = new RegExp('^' + req.params.startsWith, 'i')
    db.getDb()
        .db()
        .collection('users')
        .find({
            gherNaav: myRegEx
        }).project({
            'firstName': 1,
            'gherNaav': 2,
            'image.thumbnail': 3
        })
        //.limit(10)
        .forEach(users => {
            allUsers.push(users);
        })
        .then(result => {
            if (allUsers) {
                res.status(200).json({
                    userCount: allUsers.length,
                    users: allUsers
                });
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.get('/lazyload/mobile/:startsWith', (req, res, next) => {
    const allUsers = [];
    var myRegEx = new RegExp('^' + req.params.startsWith, 'i')
    db.getDb()
        .db()
        .collection('users')
        .find({
            'contactDetails.mobile.number': myRegEx
        })
        .project({
            'firstName': 1,
            'image.thumbnail': 2
        })
        //.limit(10)
        .forEach(users => {
            allUsers.push(users);
        })
        .then(result => {
            if (allUsers) {
                res.status(200).json({
                    userCount: allUsers.length,
                    users: allUsers
                });
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.get('/lazyload/email/:startsWith', (req, res, next) => {
    const allUsers = [];
    var myRegEx = new RegExp('^' + req.params.startsWith, 'i')
    db.getDb()
        .db()
        .collection('users')
        .find({
            'contactDetails.emailId': myRegEx
        }).project({
            'firstName': 1,
            'image.thumbnail': 2
        })
        //.limit(10)
        .forEach(users => {
            allUsers.push(users);
        })
        .then(result => {
            if (allUsers) {
                res.status(200).json({
                    userCount: allUsers.length,
                    users: allUsers
                });
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.get('/find/name/:firstName', (req, res, next) => {
    db.getDb()
        .db()
        .collection('users')
        .findOne({
            firstName: req.params.firstName
        }, {
            'collation': {
                'locale': 'en_US',
                'strength': 2
            }
        })
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.get('/find/id/:id', (req, res, next) => {
    db.getDb()
        .db()
        .collection('users')
        .findOne({
            _id: req.params.id
        })
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(200).json({
                    message: "User Does Not Exist"
                });
            }
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal Error"
            });

        });
});
router.delete('/delete/:id', (req, res, next) => {
    db.getDb()
        .db()
        .collection('users')
        .deleteOne({
            _id: req.params.id
        })
        .then(result => {
            if (result.deletedCount == 1) {
                res.status(201).json({
                    message: "successfully Deleted User",
                });
            } else if (result.deletedCount == 0) {
                res.status(200).json({
                    message: "User Not Found or Invalid User Id",
                });
            }

        })
        .catch(err => {
            console.log("\n\n\n", err, "\n\n\n");
            res.status(500).json({
                message: "Internal Server Error"
            });

        });
});
router.get('*', function (req, res) {
    res.status(404).json({
        message: "Route Does Not Exist"
    });
})
export default router;
