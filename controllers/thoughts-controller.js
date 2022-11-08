// require thoughts and users models
const { Thoughts, Users } = require('../models');

// set up thoughts controller
const thoughtsController = {
    // creates a new thought
    createThoughts({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new:true});
        })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this particular ID'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },

    // get all available thoughts
    getAllThoughts (req, res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // certain thoughts by ID
    getThoughtsById({params}, res) {
        Thoughts.findOne({_id:params.id })
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this ID'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // update a current thought by ID
    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this ID'});
                return;
            }
                res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));

    },

    // delete a current thought by ID
    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this ID'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add a new reaction
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this ID'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err))
    },

    // delete a reaction by ID
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json ({message: 'no thoughts with this ID'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }
};

// export module thought controller
module.exports = thoughtsController;