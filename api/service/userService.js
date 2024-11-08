const User = require("../../database/model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError, DuplicateUserError, PasswordValidationError, AppError,BadRequestError} = require("../errors/errors");

async function findUserById(userId) {
    const user = await User.findById(userId).exec()

    if (!user) {
        throw new NotFoundError(`User with id - ${userId} doesn't exist`)
    }
    return user;
}

async function register(username, password, name) {
    if (!username || !password || !name) {
        throw new BadRequestError('Email, password, and name are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        throw new DuplicateUserError(`Failed to register user with username - ${username}`)
    }

    if (password.length < 5) {
        throw new BadRequestError("Invalid password input")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        username: username,
        password: hashedPassword,
        name: name,
    });

    await newUser.save();

    return newUser._id
}

async function login(username, password) {
    if (!username || !password) {
        throw new BadRequestError('Email and password are required');
    }

    const user = await User.findOne({ username: username });
    if (!user) {
        throw new NotFoundError(`User not found with this email - ${username}`)
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        throw new PasswordValidationError("Password doesnt match")
    }

    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
}


module.exports = { register, login, findUserById }