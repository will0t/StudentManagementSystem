const assert = require('chai').assert;
const h = require('../../helpers');

describe('Helpers tests', () => {
	describe('reduceArrayToCommon', () => {
		it('should return array with common elements', () => {
			const arrays = [[1,3,5], [3,5], [5]];
			const result = h.general.reduceArrayToCommon(arrays);
			assert.isNotNull(result);
			assert.typeOf(result, 'array');
			assert.strictEqual(result[0], 5);
		});
	});

	describe('isValidEmail', () => {
		it('should return true for registrations@yourpave.com', () => {
			const email = 'registrations@yourpave.com';
			const result = h.general.isValidEmail(email);
			assert.isNotNull(result);
			assert.typeOf(result, 'boolean');
			assert.strictEqual(result, true);
		});
	});

	describe('extractTaggedEmails on string with 2 email addresses', () => {
		it('should return 2 email addresses', () => {
			const str = 'Hello students! @student1@gmail.com @student2@gmail.com';
			const emails = h.general.extractTaggedEmails(str);
			assert.isNotNull(emails);
			assert.typeOf(emails, 'array');
			assert.strictEqual(emails[0], 'student1@gmail.com');
			assert.strictEqual(emails[1], 'student2@gmail.com');
		});
	});

});
