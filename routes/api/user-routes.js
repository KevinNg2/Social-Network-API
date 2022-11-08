// express router
const router = require('express').Router();

// requirements from users-controller.js
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend,
} = require('../../controllers/users-controller');

// leads to api users <GET, POST>
// GET all users
// POST a new user
router.route('/').get(getAllUsers).post(createUsers);

// leads to api users id <GET, PUT, DELETE>
// GET a single user by its _id and populated thought and friend data
// PUT to update a user by its _id
// DELETE to remove user by its _id
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// leads to api users / usersId/friends/ friends Id <POST, DELETE>
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a users friend list
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

// module export router
module.exports = router;