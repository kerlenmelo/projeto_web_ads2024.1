import sqlite3 from "sqlite3";  // Certifique-se de que está importando "sqlite3"
import { open } from "sqlite";  // Driver de conexão

const dbPromise = open({
    filename: "./database/becandy.db",  // Cria o arquivo automaticamente, caso não exista
    driver: sqlite3.Database
});

export { dbPromise };
