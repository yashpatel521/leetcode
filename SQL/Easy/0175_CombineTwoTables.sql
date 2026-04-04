-- Problem 175: Combine Two Tables
-- Difficulty: Easy
--
-- Write a SQL query to report the first name, last name, city and state of each person in the Person table.
-- If the address of a person is not present in the Address table, report null instead.
--
-- Table: Person
-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | PersonId    | int     |
-- | FirstName   | varchar |
-- | LastName    | varchar |
-- +-------------+---------+
-- PersonId is the primary key for this table.
--
-- Table: Address
-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | AddressId   | int     |
-- | PersonId    | int     |
-- | City        | varchar |
-- | State       | varchar |
-- +-------------+---------+
-- AddressId is the primary key for this table.
--
-- Solution: Use LEFT JOIN to combine tables, ensuring all persons are included even if they have no address.

/* Write your MySQL query statement below */
SELECT
    p.firstName,
    p.lastName,
    a.city,
    a.state
FROM
    Person p
LEFT JOIN
    Address a
ON
    p.PersonId = a.PersonId;