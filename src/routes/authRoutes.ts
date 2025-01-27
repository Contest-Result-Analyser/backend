import {Router, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {User} from "../entities/User";
import {AppDataSource} from "../data-source";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({where: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = userRepository.create({username, email, password});
        await userRepository.save(user);

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET!,
            {expiresIn: "1h"}
        );

        res.status(201).json({token});
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({message: err.message});
        } else {
            res.status(500).json({message: "An unknown error occurred"});
        }
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({message: "Invalid login credentials"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: "Invalid login credentials"});
        }

        const access_token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET!,
            {expiresIn: "1h"}
        );

        res.json({access_token});
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({message: err.message});
        } else {
            res.status(500).json({message: "An unknown error occurred"});
        }
    }
});

export default router;