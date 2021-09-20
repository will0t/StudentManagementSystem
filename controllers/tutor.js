module.exports = (db) => {
	const { TutorModel, StudentModel, TutorStudentModel } = require('../models')(db);
	const StudentController = require("./student")(db);

	let TutorController = {};

	/**
	 * Get tutor by email
	 * @param {string} email
	 * @returns {Promise<any>}
	 */
	TutorController.getByEmail = async (email) => {
		const tutor = await TutorModel.findOne({ where: { email } });
		return tutor;
	};

	/**
	 * Get tutors by emails
	 * @param {Array} emails
	 * @returns {Promise<any>}
	 */
	TutorController.getByEmails = async (emails) => {
		const tutors = await TutorModel.findAll({ where: { email: emails } });
		return tutors;
	};

	/**
	 * Get registered students by email
	 * @param {Array} emails
	 * @returns {Promise<any>}
	 */
	TutorController.getStudentsByEmail = async (email) => {
		const students = await TutorModel.findAll({ where: { email: email } });
		return students;
	};

	/**
	 * Register students to tutor
	 * @param {string} tutorEmail
	 * @param {string[]} studentEmails
	 * @returns {Promise<void>}
	 */
	TutorController.registerStudentsToTutor = async (tutorEmail, studentEmails) => {
		const tutor = await TutorController.getByEmail(tutorEmail);
		const students = await StudentController.getByEmails(studentEmails);

		// building tutorStudent objects
		let tutorStudents = students.map((student) => (
			{studentId: student.studentId}
		))
		tutorStudents.forEach((tutorStudent) => (
			tutorStudent.tutorId = tutor.tutorId
		))

		// saving into tutorStudent table, ignoring duplicates
		const createTutorStudents = await TutorStudentModel.bulkCreate(
			tutorStudents,
			{ignoreDuplicates: true}
		);

		return;
	};

	/**
	 * Get common students by emails
	 * @param {string[]} tutorEmails
	 * @returns {Promise<any>}
	 */
	TutorController.getCommonStudents = async (tutorEmails) => {
		// get registered students for every tutor
		const tutors = await TutorController.getByEmails(tutorEmails);
		let promises = [];
		tutors.forEach((tutor) => {
			let tutorId = tutor.tutorId;
			let promise = TutorStudentModel.findAll({
			  where: {
			    tutorId: tutorId
			  }
			});
			promises.push(promise);
		})

		// get common student Ids
		const commonStudentIds = await Promise.all(promises).then((studentsArray) => {
			let studentIdsArray = [];
			const reducer = (p, c) => p.filter(e => c.includes(e));

			studentsArray.forEach((students) => {
				let studentIds = students.map((student) => student.studentId);
				studentIdsArray.push(studentIds);
			})

			return studentIdsArray.reduce(reducer);
		});

		// get common student emails
		const commonStudentEmails = await StudentController.getEmailsByIds(commonStudentIds);

		return commonStudentEmails;
	};

	return TutorController;
}
