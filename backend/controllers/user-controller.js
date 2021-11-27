const User = require('../models/user-model');


createUser = (req, res) => {
    const body = req.body;

    console.log(body)

    if (!body) {
        return res.status(400).json(
            {success: false, error: 'Request body not found.'}
        )
    }

    const user = new User(body);

    user.save().then(() => {
        return res.status(201).json({
            success: true,
            id: user._id,
            message: "User created",
        })
    }).catch(err => {
        return res.status(400).json({
            error,
            message: "Unable to create new user.",
        })
    })

}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}


module.exports = {
    createUser,
    getUserById,
}