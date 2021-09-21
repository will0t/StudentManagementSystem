const express = require('express')
const router = express.Router()
const h = require('../helpers')

module.exports = (db) => {

	const TutorController = require('../controllers/tutor')(db);
	const StudentController = require('../controllers/student')(db);
	/**
	 * @api {post} /api/register
	 * @apiName RegisterStudentsToTutor
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiDescription As a tutor, I want to register one or more students to a specified tutor.
	 * @apiParam {String} tutor Tutor's email address
	 * @apiParam {String[]} students Students' email addresses
	 */
	router.post('/register', async (req, res) => {
		try {
			// retrieving parameters
			const tutorEmail = req.body.tutor;
			const studentsEmails = req.body.students;

			// check if emails are valid
			if (!tutorEmail) throw new Error('Tutor missing');
			if (!h.general.isValidEmail(tutorEmail)) throw new Error('Wrong email format for tutor');
			if (!studentsEmails || studentsEmails.length === 0) throw new Error('Students missing');
			studentsEmails.forEach((email) => {
				if (!h.general.isValidEmail(email)) throw new Error('Wrong email format for student');
			})

			try {
				await TutorController.registerStudentsToTutor(tutorEmail, studentsEmails);
				return h.api.createApiRes(req, res, 204, 'Students registered to tutor successfully');
			} catch (error) {
				throw error;
			}
		} catch (err) {
			return h.api.createApiRes(req, res, 500, err.message);
		}
	});

	/**
	 * @api {get} /api/getcommonsstudents
	 * @apiName GetCommonStudents
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiParam {String} tutor Tutor's email address
	 * @apiDescription As a tutor, I want to retrieve a list of students common to a given list of tutors.
	 * @apiSuccess {String[]} students Students' email addresses
	 */
	router.get('/getcommonsstudents', async (req, res) => {
		try {
			// retrieving parameters
			let tutorEmails = req.query.tutor;
			if (typeof tutorEmails === 'string') tutorEmails = [tutorEmails];

			// check if emails are valid
			if (!tutorEmails) throw new Error('Tutor missing');
			tutorEmails.forEach((email) => {
				if (!h.general.isValidEmail(email)) throw new Error('Wrong email format for tutor');
			})

			try {
				const commonStudentEmails = await TutorController.getCommonStudents(tutorEmails);
				return h.api.createApiRes(req, res, 200, "Common students retrieved successfully", {students: commonStudentEmails});
			} catch (error) {
				throw error;
			}
		} catch (err) {
			return h.api.createApiRes(req, res, 500, err.message);
		}
	});

	/**
	 * @api {post} /api/retrievenotifications
	 * @apiName RetrieveNotifications
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiDescription As a tutor, I want to retrieve a list of students who can receive a given notification.
	 * @apiParam {String} tutor Tutor's email address
	 * @apiParam {String} notification Text of the notification
	 * @apiSuccess {String[]} recipients Students' email addresses
	 */
	router.post('/retrievenotifications', async (req, res) => {
		try {
			// retrieving parameters
			const tutorEmail = req.body.tutor;
			const notification = req.body.notification;

			// check if emails are valid
			if (!tutorEmail) throw new Error('Tutor missing');
			if (!h.general.isValidEmail(tutorEmail)) throw new Error('Wrong email format for tutor');

			try {
				const recipients = await TutorController.retrieveNotificationRecipients(tutorEmail, notification);
				return h.api.createApiRes(req, res, 200, 'Retrieved recipients successfully', {recipients: recipients});
			} catch (error) {
				throw error;
			}
		} catch (err) {
			return h.api.createApiRes(req, res, 500, err.message);
		}
	});

	return router;
}
