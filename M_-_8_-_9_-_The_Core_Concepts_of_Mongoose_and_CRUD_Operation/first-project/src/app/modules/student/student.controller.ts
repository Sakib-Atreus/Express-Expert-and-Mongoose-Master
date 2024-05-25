import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
// import { z } from 'zod';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {

    // creating a schema validation using zod

    // const studentValidationSchema = z.object({
    //   id: z.string(),
    //   name: z.object({
    //     firstName: z.string().max(15, {message: "First name can not be more than 15 characters"})
    //   })
    // });




    // creating a schema validation using joi

    // const JoiValidationSchema = Joi.object({
    //   id: Joi.string(),
    //   name: {
    //     firstName: Joi.string().max(15).required(),
    //     middleName: Joi.string().max(15),
    //     lastName: Joi.string().max(15).required(),
    //   },
    //   gender: Joi.string().required().valid(['male', 'female', "other"]),
    // })


    // const student = req.body.student;
    const { student: studentData } = req.body;

    //Data validation using Joi

    // const { error, value } = studentValidationSchema.validate(studentData);

    // console.log({error}, {value});


     // Data Validation using ZOD

     const zodParseData = studentValidationSchema.parse(studentData);



    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     // error,
    //     error: error.details,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err : any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
