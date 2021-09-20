const assert = require('chai').assert;

const dbConfig = require('../../config/config.json');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, TutorModel } = require('../../models')(sequelize);

const TutorController = require('../../controllers/tutor')(sequelize);

const TestTutors = [];

describe('Controller > tutor tests', () => {
	before(async () => {
		await db.sync();
		TestTutors.push(await TutorModel.create({ email: 'hello@gmail.com' }));
		TestTutors.push(await TutorModel.create({ email: 'hello1@gmail.com' }));
		TestTutors.push(await TutorModel.create({ email: 'hello2@gmail.com' }));
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
		})
	})

	after(async () => {
		await db.drop();
		await db.close();
	})
})
