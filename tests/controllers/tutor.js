const assert = require('chai').assert;
const h = require('../../helpers');

const dbConfig = require('../../config/config.json');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, TutorModel, StudentModel, TutorStudentModel } = require('../../models')(sequelize);

const TutorController = require('../../controllers/tutor')(sequelize);

const TestTutors = [];
const TestStudents = [];

describe('Controller > tutor tests', () => {
	before(async () => {
		await db.sync();
		TestTutors.push(await TutorModel.create({ email: 'hello@gmail.com' }));
		TestTutors.push(await TutorModel.create({ email: 'hello1@gmail.com' }));
		TestTutors.push(await TutorModel.create({ email: 'hello2@gmail.com' }));
		TestStudents.push(await StudentModel.create({ email: 'student1@gmail.com' }));
		TestStudents.push(await StudentModel.create({ email: 'student2@gmail.com' }));
		TestStudents.push(await StudentModel.create({ email: 'student3@gmail.com' }));
		await TutorStudentModel.create( { tutorId: TestTutors[1].tutorId, studentId: TestStudents[1].studentId });
		await TutorStudentModel.create( { tutorId: TestTutors[2].tutorId, studentId: TestStudents[2].studentId });
	})

	describe('getByEmail', async () => {
		it('passing in "hello@gmail.com" should return a tutor record', async () => {
			const tutor = await TutorController.getByEmail(TestTutors[0].email);
			assert.isNotNull(tutor);
			assert.typeOf(tutor, 'object');
			assert.strictEqual(tutor.email, TestTutors[0].email);
		})
	})

	describe('getByEmails', async () => {
		it('passing in 2 valid tutor emails should return 2 tutor records', async () => {
			const tutorEmails = [TestTutors[0].email, TestTutors[1].email];
			const tutors = await TutorController.getByEmails(tutorEmails);
			assert.isNotNull(tutors);
			assert.typeOf(tutors, 'array');
			assert.strictEqual(tutors[0].email, tutorEmails[0]);
			assert.strictEqual(tutors[1].email, tutorEmails[1]);
		})
	})

	describe('getStudentsByEmail', async () => {
		it('passing in "hello2@gmail.com" should return registered student "student3@gmail.com"', async () => {
			const registeredStudents = await TutorController.getStudentsByEmail(TestTutors[2].email);
			assert.isNotNull(registeredStudents);
			assert.typeOf(registeredStudents, 'array');
			const registeredStudentEmails = registeredStudents.map(student => student.email);
			assert.isTrue(registeredStudentEmails.includes(TestStudents[2].email));
		})
	})

	describe('registerStudentsToTutor', async () => {
		it('passing in 1 valid tutor email and 2 valid student emails should create 2 tutor-student record if not exists', async () => {
			const tutorEmail = TestTutors[0].email;
			const studentEmails = [TestStudents[0].email, TestStudents[1].email];

			await TutorController.registerStudentsToTutor(tutorEmail, studentEmails);
			const registeredStudents = await TutorController.getStudentsByEmail(tutorEmail);
			const registeredStudentEmails = registeredStudents.map(student => student.email);

			const result = h.general.reduceArrayToCommon([studentEmails, registeredStudentEmails]);
			assert.isNotNull(result);
			assert.typeOf(result, 'array');
			assert.isTrue(result.includes(studentEmails[0]));
			assert.isTrue(result.includes(studentEmails[1]));
			assert.strictEqual(result.length, 2);
		})
	})

	describe('getCommonStudents', async () => {
		it('passing in 2 valid tutor emails should return 1 common student email', async () => {
			const tutor1 = TestTutors[0].email;
			const tutor2 = TestTutors[1].email;
			const commonStudents = await TutorController.getCommonStudents([tutor1, tutor2]);
			assert.isNotNull(commonStudents);
			assert.typeOf(commonStudents, 'array');
			assert.isTrue(commonStudents.includes(TestStudents[1].email));
		})
	})

	describe('retrieveNotificationRecipients', async () => {
		it('passing in a valid tutor email and a notification should return 2 student emails', async () => {
			const tutor = TestTutors[1].email;
			const notification = "Hello @student3@gmail.com";
			const recipients = await TutorController.retrieveNotificationRecipients(tutor, notification);
			assert.isNotNull(recipients);
			assert.typeOf(recipients, 'array');
			assert.isTrue(recipients.includes(TestStudents[1].email));
			assert.isTrue(recipients.includes("student3@gmail.com"));
		})
	})

	after(async () => {
		await db.drop();
		await db.close();
	})
})
