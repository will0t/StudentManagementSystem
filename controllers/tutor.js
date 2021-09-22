module.exports = (db) => {
	const { TutorModel, StudentModel, TutorStudentModel } = require('../models')(db);
	const StudentController = require("./student")(db);
	const h = require('../helpers')

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
		const tutor = await TutorModel.findOne({ where: { email: email } });
		const tutorStudents = await TutorStudentModel.findAll({ where: { tutorId: tutor.tutorId } });
		const studentIds = tutorStudents.map((tutorStudent) => tutorStudent.studentId);
		const students = await StudentModel.findAll({ where: { studentId: studentIds }});
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
		if (tutor == null) throw new Error('Tutor does not exist');

		const students = await StudentController.getByEmails(studentEmails);
		if (studentEmails.length != students.length) throw new Error('Registering student that does not exist');

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
		// check if tutors exist
		for await (email of tutorEmails) {
			const checkTutor = await TutorController.getByEmail(email);
			if (checkTutor == null) throw new Error('Tutor does not exist');
		}

		// get registered students for every tutor
		let promises = [];
		tutorEmails.forEach((tutorEmail) => {
			promises.push(TutorController.getStudentsByEmail(tutorEmail));
		})

		// get common student Ids
		const commonStudentIds = await Promise.all(promises).then((studentsArray) => {
			let studentIdsArray = [];

			studentsArray.forEach((students) => {
				let studentIds = students.map((student) => student.studentId);
				studentIdsArray.push(studentIds);
			})

			return h.general.reduceArrayToCommon(studentIdsArray);
		});

		// get common student emails
		const commonStudents = await StudentController.getByIds(commonStudentIds);
		const commonStudentEmails = commonStudents.map((student) => student.email);

		return commonStudentEmails;
	};

	/**
	 * Get recipient students for notification
	 * @param {string} tutorEmail
	 * @param {string[]} studentEmails
	 * @returns {Promise<any>}
	 */
	TutorController.retrieveNotificationRecipients = async (tutorEmail, notification) => {
		// check if tutor exists
		const checkTutor = await TutorController.getByEmail(tutorEmail);
		if (checkTutor == null) throw new Error('Tutor does not exist');

		// extract tagged emails from notification
		const taggedEmails = h.general.extractTaggedEmails(notification);

		// check if tagged students exist
		for await (email of taggedEmails) {
			const checkStudent = await StudentController.getByEmail(email);
			if (checkStudent == null) throw new Error('Student does not exist');
		}

		// get registered students
		const registeredStudents = await TutorController.getStudentsByEmail(tutorEmail);
		const registeredStudentEmails = registeredStudents.map(student => student.email);

    // merge and remove duplicates
		let mergedEmails = registeredStudentEmails;
		taggedEmails.forEach(email => {
			if (!(mergedEmails.includes(email))) mergedEmails.push(email);
		});

		return mergedEmails;
	};

	return TutorController;
}
