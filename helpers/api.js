const ApiHelper = module.exports;

/**
 * Generic function to generate API response
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {Number} httpCode
 * @param {String} message
 * @param {Object} [resData={}]
 */
ApiHelper.createApiRes = (req, res, httpCode, message, resData) => {
	resData = resData || {};
	return res.status(httpCode).json({message, ...resData});
};
