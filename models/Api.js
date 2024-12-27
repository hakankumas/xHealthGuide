const connection = require("../database/db");

module.exports = class Api {
    // Günlük Tansiyon Bilgisi
    static blood_pressure() {
        return connection.execute(`
            SELECT 
                sick_bloodpressure.id as sick_bloodpressure_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_bloodpressure.bloodpressure as sick_bloodpressure_bloodpressure,
                sick_bloodpressure.date as sick_bloodpressure_date
            FROM sick_bloodpressure
            LEFT JOIN sick ON sick_bloodpressure.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Günlük Kalp Atış Hızı Bilgisi
    static bpm() {
        return connection.execute(`
            SELECT 
                sick_bpm.id as sick_bpm_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_bpm.bpm as sick_bpm_bpm,
                sick_bpm.date as sick_bpm_date
            FROM sick_bpm
            LEFT JOIN sick ON sick_bpm.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Günlük Kalori Bilgisi
    static calory() {
        return connection.execute(`
            SELECT 
                sick_calory.id as sick_calory_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_calory.incoming as sick_calory_incoming,
                sick_calory.outgoing as sick_calory_outgoing,
                sick_calory.date as sick_calory_date
            FROM sick_calory
            LEFT JOIN sick ON sick_calory.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Günlük Kolesterol Bilgisi
    static cholesterol() {
        return connection.execute(`
            SELECT 
                sick_cholesterol.id as sick_cholesterol_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_cholesterol.cholesterol as sick_cholesterol_cholesterol,
                sick_cholesterol.date as sick_cholesterol_date
            FROM sick_cholesterol
            LEFT JOIN sick ON sick_cholesterol.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Günlük Diyabet Bilgisi
    static diabetes() {
        return connection.execute(`
            SELECT 
                sick_diabetes.id as sick_diabetes_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_diabetes.diabetes_hungry as sick_diabetes_diabetes_hungry,
                sick_diabetes.diabetes_full as sick_diabetes_diabetes_full,
                sick_diabetes.date as sick_diabetes_date
            FROM sick_diabetes
            LEFT JOIN sick ON sick_diabetes.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Günlük Atılan Adım Bilgisi
    static step() {
        return connection.execute(`
            SELECT 
                sick_step.id as sick_step_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_step.step as sick_step_step,
                sick_step.date as sick_step_date
            FROM sick_step
            LEFT JOIN sick ON sick_step.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Aylık Bel Ölçüsü Bilgisi
    static waistline() {
        return connection.execute(`
            SELECT 
                sick_waistline.id as sick_waistline_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_waistline.waistline as sick_waistline_waistline,
                sick_waistline.date as sick_waistline_date
            FROM sick_waistline
            LEFT JOIN sick ON sick_waistline.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Aylık Kilo Bilgisi
    static weight() {
        return connection.execute(`
            SELECT 
                sick_weight.id as sick_weight_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_weight.weight as sick_weight_weight,
                sick_weight.date as sick_weight_date
            FROM sick_weight
            LEFT JOIN sick ON sick_weight.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Aylık Vücut Yağ Oranı
    static fat() {
        return connection.execute(`
            SELECT 
                sick_fat.id as sick_fat_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_fat.fat as sick_fat_fat,
                sick_fat.date as sick_fat_date
            FROM sick_fat
            LEFT JOIN sick ON sick_fat.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Aylık Metabolik Hız Bilgisi
    static metabolicrate() {
        return connection.execute(`
            SELECT 
                sick_metabolicrate.id as sick_metabolicrate_id,

                sick.id as sick_id,
                sick.name as sick_name,
                sick.surname as sick_surname,
                gender.id as gender_id,
                gender.name as gender_name,
                sick.birthday as sick_birthday,
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                
                sick_metabolicrate.metabolicrate as sick_metabolicrate_metabolicrate,
                sick_metabolicrate.date as sick_metabolicrate_date
            FROM sick_metabolicrate
            LEFT JOIN sick ON sick_metabolicrate.sick_id = sick.id
            LEFT JOIN gender ON gender.id = sick.gender_id
        `);
    }

    // Vücut Kitle Endeksi
    static sick_bmi() {
        return connection.execute(`
            SELECT 
                sick.id as sick_id,
                CONCAT(sick.name, ' ', sick.surname) as sick_fullname,
                sick.height as sick_height,
                sick.weight as sick_weight,
                ROUND(sick.weight / ((sick.height * sick.height)/10000),1) as sick_bmi
            FROM sick
            GROUP BY sick.id
            ORDER BY sick_bmi DESC
        `);
    }

    // Yaşa Göre Hasta Sayısı
    static number_of_sick_by_age() {
        return connection.execute(`
            SELECT 
                FLOOR(DATEDIFF(CURDATE(), sick.birthday) / 365) as sick_age,
                COUNT(sick.id) as number
            FROM sick
            GROUP BY sick_age
        `);
    }

    // Cinsiyete Göre Hasta Sayısı
    static number_of_sick_by_gender() {
        return connection.execute(`
            SELECT
                gender.id as gender_id,
                gender.name as gender_name,
                COUNT(sick.id) as number
            FROM gender
            LEFT JOIN sick ON sick.gender_id = gender.id
            GROUP BY gender.id
        `);
    }
};
