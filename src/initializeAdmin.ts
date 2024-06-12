import { DataSource } from "typeorm";
import bcrypt from "bcrypt";
import AppDataSource from "./data-source";
import { User } from "./entities/User";

// Fonction d'initialisation de la base de données
async function initializeDatabase() {
    await AppDataSource.initialize();

    const adminPassword = 'securepassword';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await AppDataSource.createQueryRunner().query(`
        INSERT INTO "user" (name, email, password, is_admin)
        VALUES ('Admin', 'admin@test.com', $1, true)
    `, [hashedPassword]);

    console.log('Admin user created with hashed password');
    await AppDataSource.destroy();
}

// Exécute la fonction d'initialisation
initializeDatabase().catch(error => console.log(error));