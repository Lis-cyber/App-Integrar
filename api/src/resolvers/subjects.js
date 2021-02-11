import Subject from "../models/Subject";
import Course from "../models/Course";
import Teacher from "../models/Teacher";
import { editSubjectDeleteMode } from "../utils/subjectResolverUtils";
// Query
export const allSubjects = async (_, args, ctx) => {
  if (args._id) {
    return await Subject.find({ _id: args._id });
  } else if(args.dni){
    return await Subject.find({ dni: args.dni });
  } else {
    return await Subject.find();
  }
};

// Mutations
export const createSubject = async (_, args, ctx) => {
  const newSubject = await new Subject(args.input).save();

  let course = await Course.findById(args.input.course);
  course && course.subjects.push(newSubject._id);
  course && (await course.save());

  return newSubject;
};

export const editSubject = async (_, args, ctx) => {
  if (args.deleteMode) return editSubjectDeleteMode(args);
  let subject = await Subject.findById(args._id);
  let teacher;
  let aux;

  try {
    /**
     * !Inentendible pero anda, mañana lo optimizo y lo hago mas entendible
     * !basicamente lo que hace es que borra el profesor anterior de la materia si es que le quiero agregar uno nuevo y lo hace en los 2 lados, y le agrega el nuevo a la materia y la materia al profesor nuevo, el que use esto que me avise y se lo explico
     */
    args.input.name ? (subject.name = args.input.name) : null;

    subject.teacher &&
      (aux = await Teacher.findById(subject.teacher._id)) &&
      (aux.subjects = []) &&
      (await aux.save());

    args.input.teacher &&
      (teacher = await Teacher.findById(args.input.teacher)) &&
      (subject.teacher = teacher) &&
      teacher.subjects.push(args._id) &&
      (await teacher.save());
    await subject.save();
    return subject;
  } catch (err) {
    console.error(err);
    return err;
  }
  // for (const key in inputs) {
  //   key ? (subject[key] = inputs[key]) : null;
  // }
};

export const deleteSubject = async (_, args, ctx) => {
  return await Subject.findByIdAndDelete(args._id);
};
