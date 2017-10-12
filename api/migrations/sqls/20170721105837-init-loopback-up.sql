CREATE TABLE `AccessToken` (
  id                VARCHAR(255) NOT NULL PRIMARY KEY,
  ttl               INT(11) NOT NULL,
  scopes            VARCHAR(128) NOT NULL DEFAULT '["DEFAULT"]',
  created           DATETIME NOT NULL DEFAULT NOW(),
  userId            INT(11) NOT NULL
);

CREATE TABLE `ACL` (
  id                INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  model             VARCHAR(512) NOT NULL,
  property          VARCHAR(512) NOT NULL,
  accessType        VARCHAR(512) NOT NULL,
  permission        VARCHAR(512) NOT NULL,
  principalType     VARCHAR(512) NOT NULL,
  principalId       VARCHAR(512) NOT NULL
);

CREATE TABLE `Role` (
  id                INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name              VARCHAR(512) NOT NULL,
  description       VARCHAR(512) NOT NULL,
  created           DATETIME NOT NULL DEFAULT NOW(),
  modified          DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `RoleMapping` (
  id                INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  principalType     VARCHAR(512) NOT NULL,
  principalId       VARCHAR(512) NOT NULL,
  roleId            INT(11) NOT NULL
);

CREATE TABLE `User` (
  id                INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  realm             VARCHAR(512),
  username          VARCHAR(512),
  password          VARCHAR(512),
  email             VARCHAR(512),
  emailVerified     BOOLEAN NOT NULL DEFAULT FALSE,
  verificationToken VARCHAR(512)
);

