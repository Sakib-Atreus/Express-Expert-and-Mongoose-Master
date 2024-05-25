import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [15, 'First name can not be more than 15 characters.'],
    // validate: {
    //   validator: function(value : string){
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format'
    // }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [15, 'Last name can not be more than 15 characters.'],
    // validate: {
    //   validator: (value : string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'], maxlength: [20, 'Password can not be more than 20 characters'] },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value : string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type'
    // }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  toJSON: {
    virtuals: true,
  }
});


// virtual
studentSchema.virtual('fullName').get(function(){
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  );
})

// pre save middleware / hook : will work on create() save()
studentSchema.pre('save', async function(next){
  // console.log(this, 'pre hook : we will save to data')
  
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;   // refer to doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds),
  );
  next();
})

// post save middleware / hook
studentSchema.post('save', function(doc, next){
  doc.password = ''
  // console.log(this, 'pre hook : we saved our data')

  next();
})


// Query middleware

studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}})
  next();
})

studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true}})
  next();
})

// [ {$match: {isDeleted : { $ne : true }}} , { '$match': { id : '12345' }} ]

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: { isDeleted: {$ne: true}}});
  next();
})


// creating a custom statics method

studentSchema.statics.isUserExists = async function(id: string){
  const existingUser = await Student.findOne({ id })

  return existingUser;
}


// creating a custom instance method
// studentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
