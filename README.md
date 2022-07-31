## Fake Data Generator

#### [Link To Demonstration Video](videos/demo.mp4)
#### [LIVE Client-Side Demo](https://t6-fake-data-generator-client.herokuapp.com/)
#### [LIVE Server-Side Demo](https://t6-fake-data-generator-server.herokuapp.com/)


#### Instructions:

- Implement a Web-application for the fake (random) user data generation.

- The single app page allows to:
  1. select region (at least 3 different, e.g. Poland, USA, Georgia or anything you prefer)
  2. specify the number of error per record (slider 0..10 + binded number field with max value limit at least 1000)
  3. define seed value and [Random] button to generate a random seed

- If the user change anything, the table below (20 records are generated again).

- It's necessary to support infinite scrolling in the table (you show 20 records and if the user scroll down, you add next 10 record below).

- The table show contain the following fields:
  1. Index (1, 2, 3, ...)
  2. Random identifier
  3. Name + middle name + last name (in region format)
  4. Address (in several possible formats, e.g. city+street+building+appartment or county+city+street+house)
  5. Phone (again, it's great to have several formats, e.g. international or local ones)

- Language of the names and address as well as phone codes or zip codes should be correleted to region. You need to generate random data that looks somehow realistically. So, in Poland — Polish, in USA - English or Spanish, etc.
- What is error? It's data entry error emulation. The end user specify number of errors PER RECORD. If errors = 0, there are no errors in user data. If error = 0.5, every record contains an error with probability 0.5 (one error per two recods). 10 errors results in 10 errors in every record. Error number can be entered with a slider or field (they interconnected, if change one control, other is changed too).

- You need to support 3 type of errors - delete character in random position, add random character (from a proper alphabet) in random position, swap near characters. Type of the error have to be chosen ramdomly with equal probabilities (when user specifies 1000 errors, "noisy user data" should not be too long or too short).

##### About seeding:
- Do not store RANDOM data on the server. When the user change seed, you have to change generated data. It's important that the seed passed to RNG algorithm is combination of the user seed and page number (so, you do not re-generate batches 1..9 when the user requests page 10). How to combine - it's not really important, some kind of sum should be enough. IMPORTANT: if I enter the same seed tomorrow I have to get the same data as today (even errors) on all batches - it's especially important for optional requirement.

- You will need to user lookup tables with names and surnames (separately, to be able to combine) as well as cities, etc.. They have to be large enough (more than 2 names and 10 surnames), let's say hundreds of names and several thousands of surnames. Your goal - approximately — avoid full user data duplication in ~10_000_000 records.

- Data must look realistic. 

- Application should work WITHOUT registration or/and authentication.

##### Optional requirement: 
- Add Export to CSV button (generate the number of batches which is displayed to user currently). You have to use ready CSV-formatter (DO NOT concatenate string by hands — e.g. address easily can contain comma and semicolon of anything).

- Errors should be "applied" before formatting/rendering/exporting.

## License
This repository is under [MIT LICENSE](LICENSE)
