// STANDART RESPONSE FORMAT

// EXPORT
module.exports = (err,msg,statusCode,data)=>{
	// RETURN STANDART RESPONSE OBJECT 
	return {
		error: err,
		message: msg,
		statusCode: statusCode,
		data: data
	}
}