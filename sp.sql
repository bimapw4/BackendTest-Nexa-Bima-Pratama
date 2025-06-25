CREATE PROCEDURE sp_add_kary_bima_pratama (
    IN p_nip VARCHAR(50),
    IN p_nama VARCHAR(200),
    IN p_alamat VARCHAR(200),
    IN p_gender VARCHAR(1),
    IN p_photo TEXT,
    IN p_tgl_lahir DATE,
    IN p_status INT,
    IN p_insert_by VARCHAR(50),
    IN p_id INT
)
sp: BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        INSERT INTO log_trx_api (user_id, api, request, response, insert_at)
        VALUES (
            p_insert_by,
            'sp_add_kary_bima_pratama',
            CONCAT('{"nip":"', p_nip, '","nama":"', p_nama, '"}'),
            '{"success":false,"message":"Failed to insert"}',
            NOW()
        );
    END;

    START TRANSACTION;

    IF EXISTS (SELECT 1 FROM karyawan WHERE nip = p_nip) THEN
        INSERT INTO log_trx_api (user_id, api, request, response, insert_at)
        VALUES (
            p_insert_by,
            'sp_add_kary_bima_pratama',
            CONCAT('{"nip":"', p_nip, '","nama":"', p_nama, '"}'),
            '{"success":false,"message":"NIP already exists"}',
            NOW()
        );
        ROLLBACK;
        LEAVE sp;
    END IF;

    INSERT INTO karyawan (
        nip, nama, alamat, gend, photo, tgl_lahir, status, insert_at, insert_by, update_at, update_by, id
    ) VALUES (
        p_nip, p_nama, p_alamat, p_gender, p_photo, p_tgl_lahir, p_status, NOW(), p_insert_by, NOW(), p_insert_by, p_id
    );

    INSERT INTO log_trx_api (user_id, api, request, response, insert_at)
    VALUES (
        p_insert_by,
        'sp_add_kary_bima_pratama',
        CONCAT('{"nip":"', p_nip, '","nama":"', p_nama, '"}'),
        '{"success":true,"message":"Insert success"}',
        NOW()
    );

    COMMIT;
END