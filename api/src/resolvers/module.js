import Class from "../models/Class";
import Module from "../models/Module";
import Subject from "../models/Subject";

export const getModules = async (_, { _id }) => {
  if (_id) {
    return await Module.find({ _id });
  } else {
    return await Module.find();
  }
};

export const createModule = async (_, { input }) => {
  const newModule = await new Module(input).save();

  const subject = await Subject.findById(input.subject);
  subject && subject.modules.push(newModule._id);
  subject && (await subject.save());

  return newModule;
};
export const editModule = async (_, { _id, input }) => {
  let newModule = await Module.findById(_id);

  if (!newModule) return false;

  for (const key in input) {
    key ? (newModule[key] = input[key]) : null;
  }

  // newModule.classes.push()
  await newModule.save();

  return newModule;
};

export const deleteModule = async (_, { _id }) => {
  //COMPLETED: cuando borre un modulo, borrar sus clases y borrar sus subjects y viceversa
  const MODULE = await Module.findById(_id);

  if (MODULE.classes.length) {
    // Deleting all the classes of the module from the db
    let classes = MODULE.classes.map((_class) =>
      Class.findByIdAndDelete(_class._id)
    );
    await Promise.all(classes);
  }

  // Deleting the module from the subject
  const SUBJECT = await Subject.findById(MODULE.subject._id);
  SUBJECT.modules = SUBJECT.modules.filter((module) => module._id !== _id);
  await SUBJECT.save();

  return MODULE;
};
