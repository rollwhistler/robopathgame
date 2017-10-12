/* Replace with your SQL commands */

DELETE FROM `RoleMapping` where `principalType` = 'USER' AND `principalId` = 1;
DELETE FROM `RoboUser` where id = 1;
