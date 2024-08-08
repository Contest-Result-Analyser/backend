import { User } from '../models/user';

export const getUser = (req: Request, res: Response): void => {
    const user = new User('Alice', 'alice@example.com');
    // @ts-ignore
    res.json({ user: user.getDetails() });
};