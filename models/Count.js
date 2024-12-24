const connection = require("../database/db");

module.exports = class Count {
    // Toplam Hasta Sayısı
    static count_sick() {
        return connection.execute(`
            SELECT 
                COUNT(sick.id) as number
            FROM sick
        `);
    }

    // Erkek Hasta Sayısı
    static count_sick_by_male() {
        return connection.execute(`
            SELECT 
                gender.id,
                gender.name,
                COUNT(sick.id) as number
            FROM gender
            LEFT JOIN sick ON sick.gender_id = gender.id
            WHERE gender.id = 1
            GROUP BY gender.id
        `);
    }

    // Kadın Hasta Sayısı
    static count_sick_by_female() {
        return connection.execute(`
            SELECT 
                gender.id,
                gender.name,
                COUNT(sick.id) as number
            FROM gender
            LEFT JOIN sick ON sick.gender_id = gender.id
            WHERE gender.id = 2
            GROUP BY gender.id
        `);
    }

    // Kronik Hasta Sayısı
    static count_sick_by_chronic() {
        return connection.execute(`
            SELECT 
                COUNT(DISTINCT sick_chronic.sick_id) as number
            FROM sick_chronic
        `);
    }
};
