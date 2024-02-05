const users = require("../models/users");

const getUserLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await users.findOne({email});
        console.log(user);
        if(user){
            const validPassword = bcryptjs.compareSync(req.body.password, user.password);
            if(user.active){
                if(validPassword){
                    const payload = {uid: user.id}
                    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '4h'})
                    res.status(200).json(user, token);
                }else{
                    res.status(400).json({message: "error"})
                }

            }else{
                res.status(400).json({message: "user not active"})
            }

        }else{
            res.status(404).json({message: "this user doesnt exit"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

module.exports = {getUserLogin};