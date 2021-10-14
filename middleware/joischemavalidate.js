// const Joi = require('@hapi/joi')
const Joi = require('joi')

const constants = require("../constants")

const validateobjectschema = (data, schema) => {
    // const result = Joi.validate(data, schema, {convert: false})
    const { error, value } = schema.validate(data);
    if(error){
        const errordetail = error.details.map(value => {
            return{
                errorpath: value.path,
                errormsg: value.message
            };
        })
        console.log("Joi Schema Validation Result : === ",errordetail)
        return errordetail
    }
    // else
    return null

}


module.exports.validatebody = (schema) => {
    return (req, res, next) => {   
        console.log(req.body) 
        let response = {...constants.defaultserverresponse}
        const error = validateobjectschema(req.body, schema);
        if(error){
            response.body = error
            response.message = constants.requestvalidationmessage.bad_request
            return res.status(response.status).send(response)
        }
        return next()
    }
} 

module.exports.validatequeryparams = (schema) => {
    return (req, res, next) => {    
        let response = {...constants.defaultserverresponse}
        const error = validateobjectschema(req.query, schema);
        if(error){
            response.body = error
            response.message = constants.requestvalidationmessage.bad_request
            return res.status(response.status).send(response)
        }
        return next()
    }
} 