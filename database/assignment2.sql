-- 5.1 Inserting a new account record for Tony Stark
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 5.2 Updating Tony Stark's account type to Admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- 5.3 Deleting Tony Stark's account record
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- 5.4 Updating the GM Hummer record to change the description
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5.5 Selecting make, model, and classification name for inventory items in the "Sport" category
SELECT i.inv_make, i.inv_model, c.classification_name
FROM public.inventory i
INNER JOIN public.classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 5.6 -- Updating the inv_image and inv_thumbnail columns to add "/vehicles" to the file path
UPDATE public.inventory
SET inv_image = REGEXP_REPLACE(inv_image, '^(/images)/', '\1/vehicles/'),
    inv_thumbnail = REGEXP_REPLACE(inv_thumbnail, '^(/images)/', '\1/vehicles/');