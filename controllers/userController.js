import User from '../models/user.js';

export const createUser =async (req, res) =>{
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        console.log('error',error);
    }
}

export const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        console.log(error.message);
    }
}

export const findUserById = async (req, res) =>{
    const {id} = req.params
    try {
        const user = await User.findById(id)
        res.send(user)
    } catch (error) {
        console.log('error');
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


export const deleteUser = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).send(deletedUser)
    } catch (error) {
        
    }
}

export const depositUser = async (req, res) => {
    const { id } = req.params;
    const { cash } = req.body; 

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cash += cash; 

        const updatedUser = await user.save();

        res.status(200).json({ message: 'Deposit successful', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const withdrawUser = async (req, res) => {
    const { id } = req.params;
    const { cash } = req.body; 

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.cash < cash) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        user.cash -= cash; 

        const updatedUser = await user.save();

        res.status(200).json({ message: 'Withdrawal successful', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const transferUser = async (req, res) => {
    const { from, id } = req.params;
    const { cash } = req.body;

    try {
        const sender = await User.findById(from);
        const receiver = await User.findById(id);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        if (sender.cash < cash) {
            return res.status(400).json({ message: "Insufficient funds for transfer" });
        }

        sender.cash -= cash;
        receiver.cash += cash;

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const filterUsers = async (req, res) => {
    const { cash } = req.query;

    try {
        if (!cash || isNaN(cash)) {
            return res.status(400).json({ message: 'Invalid or missing cash parameter' });
        }

        const cashFound = await User.find({ cash: { $gte: parseInt(cash) } });
        res.send(cashFound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
