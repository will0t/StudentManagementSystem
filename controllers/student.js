module.exports = (db) => {
	const { StudentModel } = require('../models')(db);

	let StudentController = {};

	/**
	 * Get student by email
	 * @param {string} email
	 * @returns {Promise<any>}
	 */
	StudentController.getByEmail = async (email) => {
		const student = await StudentModel.findOne({ where: { email } });
		return student;
	};

	/**
	 * Get students by emails
	 * @param {Array} emails
	 * @returns {Promise<any>}
	 */
	StudentController.getByEmails = async (emails) => {
		const students = await StudentModel.findAll({ where: { email: emails } });
		return students;
	};

	/**
	 * Get student emails by Ids
	 * @param {Array} ids
	 * @returns {Promise<any>}
	 */
	StudentController.getEmailsByIds = async (studentIds) => {
		const students = await StudentModel.findAll({ where: { studentId: studentIds } });
		const studentEmails = students.map((student) => student.email);
		return studentEmails;
	};

	return StudentController;
}
