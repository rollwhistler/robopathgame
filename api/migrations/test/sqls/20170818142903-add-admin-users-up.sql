/* Replace with your SQL commands */

SET @now = NOW();
SET @system_start_date = DATE_SUB(@now, INTERVAL 6 MONTH);

SET @marc_admin_user_id = 1;

/* Create Admin Users, default password is `password' */

INSERT INTO
  `RoboUser` (`id`, `firstName`, `familyName`, `email`, `password`)
  VALUES (@marc_admin_user_id, 'Admin', 'User','admin@example.com', '$2a$10$vvDNhYgnWro0Ls0XadLa1eh1zVJI58HUK5qvA1Ilsjj/bGphD7oGq');

/* Create Role Mappings */

INSERT INTO `RoleMapping` VALUES (1, 'USER', @marc_admin_user_id, 1);
