import { z } from "zod";

// Zod schema for UserName
const userNameValidationSchema = z.object({
    // firstName: z.string()
    //   .max(15, 'First name can not be more than 15 characters.'),
    //   .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
    //     message: 'First name must be capitalized',
    //   }),
    firstName: z.string().min(1).max(15),
    middleName: z.string().optional(),
    lastName: z.string().min(1).max(15),
    // lastName: z.string()
    //   .max(15, 'Last name can not be more than 15 characters.')
    //   .refine(value => /^[A-Za-z]*$/.test(value), {
    //     message: 'Last name must contain only alphabetic characters',
    //   })
    //   .optional(),
  });
  
  // Zod schema for Guardian
  const guardianValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
  });
  
  // Zod schema for LocalGuardian
  const localGuardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
  });
  
  // Zod schema for Student
  const studentValidationSchema = z.object({
    id: z.string(),
    name: userNameValidationSchema,
    password: z.string().max(20),
    gender: z.enum(['male', 'female', 'other'], { 
      invalid_type_error: 'Gender must be one of "male", "female", or "other"',
    }),
    dateOfBirth: z.string().optional(),
    email: z.string().email('Email must be a valid email address'),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'inActive']).default('active'),
    isDeleted: z.boolean().default(false),
  });


  export default studentValidationSchema;