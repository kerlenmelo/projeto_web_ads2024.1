import { Router } from 'express';
import path from 'path';

const routerAuth = Router();

// Rota de autenticação
routerAuth.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === 'admin') {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Senha incorreta' });
    }
});

export { routerAuth };
