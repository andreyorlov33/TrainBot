DROP DATABASE trainBot_db;
CREATE DATABASE trainBot_db;
USE trainBot_db;

SELECT * FROM Users;
SELECT * FROM Programs;
SELECT * FROM WorkoutDays;

INSERT INTO Programs (name, days, description) 
VALUES ("Crossfit", 5, "A a week, 5 day program for the intermediate athlete on energy system training");
INSERT INTO Programs (name, days, description) 
VALUES ("Powerlifting", 5, "A 2 week program for the novice lifter to get their hands dirty");
INSERT INTO Programs (name, days, description) 
VALUES ("Rowing", 1, "A 5 days program for the beginner rower to understand proper technique in different conditions");

INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'1','4 rounds: \n20 UB Wall Balls \n10 UB C2B Pull-ups','1');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'2','3 rounds for time: \n7 hang squat clean 155# \n7 box jumps 24inches \nrest 5min \n3 rounds for time: \n7 thrusters @ 135# \n7 box jumps 24inches','1');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'3','Airdyne 1min @ 85% \nAirdyne 1min @ 50% \nx15 sets \n(30 total minutes)','1');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'4','12min EMOM: \nOdd: 7-10 HSPU (kipping ok, but start with strict) \nEven: 2-3 Muscle Ups \n+ \n12min EMOM: \nOdd: 8-10 Ring Dips \nEven: 5-7 C2B Pull-ups','1');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'5','4 Rounds for Time: \nRun 400m \n4 Muscle Ups \n40 Double Unders','1');

INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'1','A. Find a heavy single set of 5 reps Back Squat \nB. Find a heavy single set of 5 reps Strict Press \nC. Find a heavy single set of 3 reps of Power Cleans','2');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'2','A. 3 Sets of 5 Reps of Back Squats @ 70% of the first workout \nB. Find a heavy single set of 5 reps of Bench Press \nC. Find a single heavy set of 5 reps of Deadlift','2');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'3','A. 3 Sets of 5 Reps of Back Squats, add 5lbs more than previous session \nB. 3 Sets of 5 Reps of Strict Press @ 70% of the first workout \nC. 7 Sets of 3 reps of Chin Ups','2');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'4','A. 3 Sets of 5 Reps of Back Squats, add 5lbs more than previous session \nB. 3 Sets of 5 Reps of Bench Press @ 70% of the first workout \nC. 4 Sets of 2 Power Cleans','2');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'5','A. 3 Sets of 5 Reps of Back Squats, add 5lbs more than previous session \nB. 3 Sets of 5 Reps of Strict Press, add 5lbs more than previous session \nC. Find a single heavy set of 3 reps of Deadlift','2');

INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'1','Row 500m @ 1:55/500m pace \nrest 30 sec \nx3 \nrest 3min \nx2','3');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'2','Row 2k @ 100% \nrest 24min \nRow 2k @ 100%','3');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'3','Row 500m @ 1:54/500m pace \nrest 30 sec \nx3 \nrest 3min \nx2','3');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'4','Row 1k @ 4:00 min pace \nRow 1k @ 3:48 pace \nrest 30 seconds \nx 3 sets','3');
INSERT INTO `WorkoutDays` (`id`,`day`,`text`,`ProgramId`) 
VALUES (DEFAULT,'5','Row 500m @ 1:53/500m pace \nrest 30 sec \nx3 \nrest 3min \nx2','3');

