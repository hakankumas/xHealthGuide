const connection = require("../database/db");

module.exports = class Sick {
    // Hasta Bilgileri
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
                ROUND(sick.weight / ((sick.height * sick.height)/10000),1) as sick_bmi
            FROM sick
            LEFT JOIN gender ON gender.id = sick.gender_id
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
};
