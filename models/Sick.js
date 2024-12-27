const connection = require("../database/db");

module.exports = class Sick {
    // Hasta Bilgileri + Vücut Kitle Endeksi
    static info_sick() {
        return connection.execute(`
            SELECT 
                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                sick.height as sick_height,
                sick.weight as sick_weight,
                ROUND(sick.weight / ((sick.height * sick.height)/10000),1) as sick_bmi,
				COUNT(chronic.id) as chronic_number
                
            FROM sick
            LEFT JOIN gender ON gender.id = sick.gender_id
            LEFT JOIN sick_chronic ON sick_chronic.sick_id = sick.id
            LEFT JOIN chronic ON sick_chronic.chronic_id = chronic.id
            GROUP BY sick.id
        `);
    }

    // Kronik Hasta Bilgileri
    static info_chronic_sick() {
        return connection.execute(`
            SELECT 
                sick_chronic.id as sick_chronic_id,
                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                sick.height as sick_height,
                sick.weight as sick_weight,
                
                chronic.id as chronic_id,
                chronic.name as chronic_name
            FROM sick_chronic
            LEFT JOIN sick ON sick_chronic.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
            LEFT JOIN chronic ON sick_chronic.chronic_id = chronic.id
        `);
    }

    // Hasta Listesi
    static list_sick() {
        return connection.execute(`
            SELECT 
                sick.id as sick_id, 
                sick.name as sick_name,
                sick.surname as sick_surname
            FROM sick
        `);
    }

    // Kronik Hastalıklar Listesi
    static list_chronic() {
        return connection.execute(`
            SELECT 
                chronic.id as chronic_id, 
                chronic.name as chronic_name
            FROM chronic
        `);
    }

    // Kronik Hastalık Dağılımı
    static distribution_of_chronic_sick() {
        return connection.execute(`
            SELECT  
                chronic.id as chronic_id,
                chronic.name as chronic_name,
                COUNT(sick_chronic.sick_id) as number
            FROM sick_chronic
            INNER JOIN chronic ON sick_chronic.chronic_id = chronic.id
            GROUP BY sick_chronic.chronic_id
        `);
    }

    // Kronik Hastaların Cinsiyet Dağılımı
    static gender_distribution_of_chronic_sick() {
        return connection.execute(`
            SELECT 
                chronic.id as chronic_id,
                chronic.name as chronic_name,

                gender.id as gender_id,
                gender.name as gender_name,
                
                COUNT(sick_chronic.sick_id) as number
            FROM sick_chronic
            LEFT JOIN sick ON sick_chronic.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
            LEFT JOIN chronic ON sick_chronic.chronic_id = chronic.id
            GROUP BY gender.id, chronic.id
            ORDER BY chronic.name ASC, gender.id ASC
        `);
    }

    // Hasta Ekleme
    static create(condition) {
        const { name, surname, gender_id, birthday, height, weight } =
            condition;
        return connection.execute(
            `
            INSERT INTO sick (name, surname, gender_id, birthday, height, weight)
            VALUES (?,?,?,?,?,?)
        `,
            [name, surname, gender_id, birthday, height, weight]
        );
    }

    // Hasta Silme
    static delete(sick_id) {
        return connection.execute(`DELETE FROM sick WHERE id = ${sick_id}`);
    }

    // Hasta İçin Veri Ekleme
    static create_data(parameter_type, sick_id, value, process_date) {
        return connection.execute(
            `
            INSERT INTO sick_${parameter_type} (sick_id, ${parameter_type}, date)
            VALUES (?,?,?)
        `,
            [sick_id, value, process_date]
        );
    }

    // Hasta İçin Kronik Hastalık Ekleme
    static create_chronic(sick_id, chronic_id) {
        return connection.execute(
            `
            INSERT INTO sick_chronic (sick_id, chronic_id)
            VALUES (?,?)
        `,
            [sick_id, chronic_id]
        );
    }
};
