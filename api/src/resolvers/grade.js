import Grade from "../models/Grade";

//Query
export const allGrades = async (_, args, ctx) => {
  if (args._id) {
    return await Grade.find({ _id: args._id });
  } else {
    return await Grade.find().sort({ name: 1 });
  }
};

// Mutations
export const createGrade = async (_, args, ctx) => {
  return await new Grade(args.input).save();
};

export const editGrade = async (parent, args, ctx) => {
  let grade = await Grade.findById(args._id);

  let inputs = args.input;
  for (const key in inputs) {
    key ? (grade[key] = inputs[key]) : grade[key];
  }

  await grade.save();

  return grade;
};

export const deleteGrade = async (_, args, ctx) => {
  return await Grade.findByIdAndDelete(args._id);
};
