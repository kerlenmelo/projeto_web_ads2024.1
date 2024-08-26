import { Router } from 'express';
import { getAllKits } from '../models/kitsModels.js';


const routerKits = Router();


routerKits.get("/api/kits", async (_, response) => {
    const kits = await getAllKits()
    return response.status(200).json(kits)
});

export { routerKits}