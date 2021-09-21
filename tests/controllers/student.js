const assert = require('chai').assert;

const dbConfig = require('../../config/config.json');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, StudentModel } = require('../../models')(sequelize);

const StudentController = require('../../controllers/student')(sequelize);

const TestStudents = [];

describe('Controller > student tests', () => {
	before(async () => {
		await db.sync();
		TestStudents.push(await StudentModel.create({ email: 'hello@gmail.com' }));
		TestStudents.push(await StudentModel.create({ email: 'hello1@gmail.com' }));
		TestStudents.push(await StudentModel.create({ email: 'hello2@gmail.com' }));
	})

	describe('getByEmail', async () => {
		it('passing in "hello@gmail.com" should return a student record', async () => {
			const student = await StudentController.getByEmail(TestStudents[0].email);
			assert.isNotNull(student);
			assert.typeOf(student, 'object');
			assert.strictEqual(student.email, TestStudents[0].email);
		})
	})

	describe('getByEmails', async () => {
		it('passing in 2 valid student emails should return 2 student records', async () => {
			const studentEmails = [TestStudents[0].email, TestStudents[1].email];
			const students = await StudentController.getByEmails(studentEmails);
			assert.isNotNull(students);
			assert.typeOf(students, 'array');
			assert.strictEqual(students[0].email, studentEmails[0]);
			assert.strictEqual(students[1].email, studentEmails[1]);
		})
	})

	describe('getByIds', async () => {
		it('passing in 2 valid student Ids should return 2 student Ids', async () => {
			const studentIds = [TestStudents[0].studentId, TestStudents[1].studentId];
			const students = await StudentController.getByIds(studentIds);
			assert.isNotNull(students);
			assert.typeOf(students, 'array');
			assert.strictEqual(students[0].studentId, studentIds[0]);
			assert.strictEqual(students[1].studentId, studentIds[1]);
		})
	})

	after(async () => {
		await db.drop();
		await db.close();
	})
})
