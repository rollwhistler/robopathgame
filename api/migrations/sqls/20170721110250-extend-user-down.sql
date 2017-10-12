ALTER TABLE `RoboUser`
DROP COLUMN `firstName`,
DROP COLUMN `familyName`;

RENAME TABLE `RoboUser` TO `User`;
