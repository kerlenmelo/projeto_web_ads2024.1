import { Router } from 'express';
import path from 'path';


const routerHome = Router();


routerHome.get("/home", (req, res) => {
    res.sendFile(path.resolve('../public/html/home.html'));
});

export { routerHome }