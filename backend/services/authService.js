import User from '../models/User.js';

export async function register(email, nickname, password) {
    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
        throw new Error('Nickname already exists!');
    }

    const user = new User({
        email,
        nickname,
        hashedPassword: password
    });
    await user.save();

    return {
        id: user._id,
        nickname: user.nickname,
    };
}

export async function login(nickname, password) {
    const user = await User.findOne({ nickname });
    if (!user) {
        throw new Error('No such user found!');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Incorrect password!');
    }

    return {
        userId: user._id,
        nickname: user.nickname,
    };
}
