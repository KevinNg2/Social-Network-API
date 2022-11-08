// express router
const router = require('express').Router();

// requirements from thoughts- controller
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// leads to api thoughts <GET>
// GET to get all thoughts
router.route('/').get(getAllThoughts);

// leads to api thoughts/ <GET, PUT, DELETE>
// GET to get a single thought by its _id
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

// leads to api thoughts/ user id <POST>
// POST to create a new thought
router.route('/:userId').post(createThoughts);

// leads to api thoughts/ thoughtsId/ reactions <POST>
// POST to create a reaction stored in a single thought's reaction array field
router.route('/:thoughtId/reactions').post(addReaction);

// leads to api thoughts/ thoughtId/reactionId <DELETE>
// Delete to pull and remove a reaction by the reactions reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// export module router
module.exports = router;