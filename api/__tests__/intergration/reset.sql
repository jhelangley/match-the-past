TRUNCATE user_table RESTART IDENTITY;
INSERT INTO user_table (username, password, is_admin, current_score)
VALUES
    ('username 1', 'password 1', false, 1),
    ('username 2', 'password 2', false, 2),
    ('username 3', 'password 3', false, 3);

TRUNCATE event_card RESTART IDENTITY;
INSERT INTO event_card (title, date, description)
VALUES
    ('title 1', '1066-10-14', 'description 1'),
    ('title 2', '1215-06-15', 'description 2'),
    ('title 3', '1666-09-02', 'description 3');