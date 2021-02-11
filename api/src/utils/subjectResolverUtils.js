import Subject from "../models/Subject";
import Course from "../models/Course";
import Teacher from "../models/Teacher";

export const editSubjectDeleteMode = async (args) => {
  //deleteMode tiene que estar activado
  // para eliminar un profesor de una materia y viceversa
  try {
    let subject = await Subject.findById(args._id);
    let teacher = await Teacher.findById(subject.teacher._id);

    //Borro el profesor  de la materia
    //Y la materia del teacher
    teacher.subjects = teacher.subjects.filter(
      (subject) => parseInt(subject._id) !== parseInt(args._id)
    );
    subject.teacher = {};

    await teacher.save();
    return await subject.save();
  } catch (err) {
    console.error(err);
  }
};
