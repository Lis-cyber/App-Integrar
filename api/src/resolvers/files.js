import Student from "../models/Student";
import Course from "../models/Course";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { sendMailWithPassword } from "../mail";
import Teacher from "../models/Teacher";

export const createStudentsWithCsv = async (_, { file, courseId }) => {
  const { createReadStream } = await file;
  const stream = createReadStream();
  let fileBuffer = [];

  // Adds every peace of the file stream to a big array of "chunks"
  stream.on("data", function (chunk) {
    fileBuffer = [...fileBuffer, chunk];
  });

  stream.on("end", async function () {
    // Puts together the array of "chunks", parces it as a string and cuts it in csv rows
    const rows = Buffer.concat(fileBuffer)
      .toString("utf8")
      .replace(/(\r\n|\r)/g, "\n")
      .split("\n")
      .slice(1); //Gets rid of the titles

    // Returns a promise for each student in the .csv file
    const studentPromises = rows
      .map((row) => {
        row = row.replace(/;/g, ",");
        let fields = row.split(",");
        fields.length % 7 ? fields.pop() : null; // Gets rid of the last line break

        // We grab the elements in order and add them to create the mongo document
        if (fields.length) {
          const input = {
            name: fields[0],
            lastname: fields[1],
            dni: fields[2],
            email: fields[3],
            whatsapp: fields[4],
            address: fields[5],
            birthday: fields[6],
            course: courseId ? courseId : null,
          };
          // Returns a promise
          return new Student(input).save();
        }
      })
      .filter((promise) => promise);

    // If any of the promises is rejected the hole Promise.all will be
    // If none is rejected it returns an array with all the students created
    let students;
    try {
      students = await Promise.all(studentPromises);
    } catch (err) {
      console.log(err);
      return { status: false };
    }

    // Once the Promise all is finished we add each student to the course given by args
    if (courseId && students) {
      const course = await Course.findById(courseId);
      if (course) {
        students.forEach(async (student) => {
          course.students.push(student._id);
        });
        await course.save();
      }
    }

    const passwords = [];
    // Creating the users for each student
    const usersPromises = students.map(async ({ dni, name, email }) => {
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      passwords.push(password);
      const hash = await bcrypt.hash(password, 12);

      console.log(`The password for dni ${dni} (Student) is: `, password);

      return new User({
        dni,
        name,
        email,
        password: hash,
        role: "Student",
      }).save();
    });

    let users;
    try {
      users = await Promise.all(usersPromises);
    } catch (err) {
      console.log(err);
      return { status: false };
    }

    const mailPromises = users.map(async (user, i) => {
      return await sendMailWithPassword(user, passwords[i]);
    });

    try {
      const results = await Promise.all(mailPromises);
      results.forEach(([isMailSent, error]) => {
        if (!isMailSent) {
          console.log(error);
          return { status: false };
        }
      });
    } catch (err) {
      console.log(err);
      return { status: false };
    }

    return {
      status: true,
    };
  });
};

export const createTeachersWithCsv = async (_, { file }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  let fileBuffer = [];

  // Adds every peace of the file stream to a big array of "chunks"
  stream.on("data", function (chunk) {
    fileBuffer = [...fileBuffer, chunk];
  });

  stream.on("end", async function () {
    // Puts together the array of "chunks", parces it as a string and cuts it in rows
    const rows = Buffer.concat(fileBuffer)
      .toString("utf8")
      .replace(/(\r\n|\r)/g, "\n")
      .split("\n")
      .slice(1); //Gets rid of the titles

    // Returns a promise for each student in the .csv file
    const teacherPromises = rows
      .map((row) => {
        row = row.replace(/;/g, ",");
        let fields = row.split(",");
        fields.length % 7 ? fields.pop() : null; // Gets rid of the last line break

        // We grab the elements in order and add them to create the mongo document
        if (fields.length) {
          const input = {
            name: fields[0],
            lastname: fields[1],
            dni: fields[2],
            email: fields[3],
            whatsapp: fields[4],
            address: fields[5],
            birthday: fields[6],
           // course: courseId ? courseId : null,
          };
          // Returns a promise
          return new Teacher(input).save();
        }
      })
      .filter((promise) => promise);

    // If any of the promises is rejected the hole Promise.all will be
    // If none is rejected it returns an array with all the students created
    const teachers = await Promise.all(teacherPromises);

    const passwords = [];
    // Creating the users for each student
    const usersPromises = teachers.map(async ({ dni, name, email }) => {
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      passwords.push(password);
      const hash = await bcrypt.hash(password, 12);

      console.log(`The password for dni ${dni} (Teacher) is: `, password);

      return new User({
        dni,
        name,
        email,
        password: hash,
        role: "Teacher",
      }).save();
    });

    let users;
    try {
      users = await Promise.all(usersPromises);
    } catch (err) {
      console.log(err);
      return { status: false };
    }

    const mailPromises = users.map(async (user, i) => {
      return await sendMailWithPassword(user, passwords[i]);
    });

    try {
      const results = await Promise.all(mailPromises);
      results.forEach(([isMailSent, error]) => {
        if (!isMailSent) {
          console.log(error);
          return { status: false };
        }
      });
    } catch (err) {
      console.log(err);
      return { status: false };
    }

    return {
      status: true,
    };
  });
};
