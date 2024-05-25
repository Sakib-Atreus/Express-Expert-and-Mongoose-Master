import Joi from "joi";

// Joi schema for UserName
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(15)
      .required()
      .regex(/^[A-Z][a-zA-Z]*$/, 'capitalize')
      .messages({
        'string.max': 'First name can not be more than 15 characters.',
        'string.pattern.base': '{#label} is not in capitalize format',
        'any.required': 'First name is required',
      }),
    middleName: Joi.string().allow(null, ''),
    lastName: Joi.string()
      .trim()
      .max(15)
      .required()
      .regex(/^[A-Za-z]*$/, 'alpha')
      .messages({
        'string.max': 'Last name can not be more than 15 characters.',
        'string.pattern.base': '{#label} is not valid',
        'any.required': 'Last name is required',
      }),
  });

  // Joi schema for Guardian
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'any.required': 'Father name is required',
    }),
    fatherOccupation: Joi.string().required().messages({
      'any.required': 'Father occupation is required',
    }),
    fatherContactNo: Joi.string().required().messages({
      'any.required': 'Father contact number is required',
    }),
    motherName: Joi.string().required().messages({
      'any.required': 'Mother name is required',
    }),
    motherOccupation: Joi.string().required().messages({
      'any.required': 'Mother occupation is required',
    }),
    motherContactNo: Joi.string().required().messages({
      'any.required': 'Mother contact number is required',
    }),
  });

  // Joi schema for LocalGuardian
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Local guardian name is required',
    }),
    occupation: Joi.string().required().messages({
      'any.required': 'Local guardian occupation is required',
    }),
    contactNo: Joi.string().required().messages({
      'any.required': 'Local guardian contact number is required',
    }),
    address: Joi.string().required().messages({
      'any.required': 'Local guardian address is required',
    }),
  });

  // Joi schema for Student
  const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'any.required': 'ID is required',
    }),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .messages({
        'any.only': '{#label} is not valid',
        'any.required': 'Gender is required',
      }),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required().messages({
      'string.email': '{#label} is not a valid email type',
      'any.required': 'Email is required',
    }),
    contactNo: Joi.string().required().messages({
      'any.required': 'Contact number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
      'any.required': 'Emergency contact number is required',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .messages({
        'any.only': '{#label} is not a valid blood group',
      }),
    presentAddress: Joi.string().required().messages({
      'any.required': 'Present address is required',
    }),
    permanentAddress: Joi.string().required().messages({
      'any.required': 'Permanent address is required',
    }),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string()
      .valid('active', 'blocked')
      .default('active')
      .messages({
        'any.only': '{#label} is not valid',
      }),
  });


export default studentValidationSchema;