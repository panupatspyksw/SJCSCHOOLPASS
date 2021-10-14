const Joi = require("joi")

module.exports.sendpass = Joi.object().keys({
    name: Joi.string().required().max(100).min(1).pattern(new RegExp('^[\u0E00-\u0E7Fa-zA-Z]+[\u0E00-\u0E7Fa-zA-Z0-9._ ]+[\u0E00-\u0E7Fa-zA-Z0-9.]{1,100}$')).messages({ 
        'string.empty': `กรุณากรอกชื่อหน่วยงาน`,
        'any.required': `กรุณากรอกชื่อหน่วยงาน`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 1 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 10 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    }),
    type: Joi.string().required().max(100).min(1).pattern(new RegExp('^[\u0E00-\u0E7Fa-zA-Z]+[\u0E00-\u0E7Fa-zA-Z0-9._ ]+[\u0E00-\u0E7Fa-zA-Z0-9.]{1,100}$')).messages({ 
        'string.empty': `กรุณากรอกชื่อหน่วยงาน`,
        'any.required': `กรุณากรอกชื่อหน่วยงาน`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 1 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 10 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    }),
    class: Joi.string().required().max(100).min(1).pattern(new RegExp('^[\u0E00-\u0E7Fa-zA-Z]+[\u0E00-\u0E7Fa-zA-Z0-9._ ]+[\u0E00-\u0E7Fa-zA-Z0-9.]{1,100}$')).messages({ 
        'string.empty': `กรุณากรอกชื่อหน่วยงาน`,
        'any.required': `กรุณากรอกชื่อหน่วยงาน`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 1 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 10 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    }),
    no: Joi.number().min(1).max(100000000000).required().messages({ 
        'any.required': `กรุณากรอกงบประมาณ`,
        'string.empty': 'กรุณากรอกงบประมาณ',
        'number.base': 'กรุณากรอกเป็นตัวเลขเท่านั้น',
        'number.min': `กรุณาระบุงบประมาณไม่ต่ำกว่า 1000`,
        'number.max': `กรุณาระบุงบประมาณไม่เกิน 100000000`,
    }),
    vaccine: Joi.string().required().max(100).min(1).pattern(new RegExp('^[\u0E00-\u0E7Fa-zA-Z]+[\u0E00-\u0E7Fa-zA-Z0-9._ ]+[\u0E00-\u0E7Fa-zA-Z0-9.]{1,100}$')).messages({ 
        'string.empty': `กรุณากรอกชื่อหน่วยงาน`,
        'any.required': `กรุณากรอกชื่อหน่วยงาน`,
        'string.min': `ต้องมีตัวอักษรความยาวไม่ต่ำกว่า 1 ตัว`,
        'string.max': `ต้องมีตัวอักษรความยาวไม่เกิน 10 ตัว`,
        'string.pattern.base': 'กรูณากรอกเป็นตัวเลขและตัวอักษรภาษาอังกฤษเท่านั้น'
    })
})
