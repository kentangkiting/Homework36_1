import axios from "axios";

interface Student {
  id: number;
  height?: number;
  lesson: string;
}

let students: Student[] = [];

export const getStudents = () => {
  return axios
    .get("https://pokeapi.co/api/v2/pokemon/1")
    .then((response) => {
      students = response.data;
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const setStudentHeight = (studentId: any, height: any) => {
  const selectedStudent = students.find((student) => student.id === studentId);
  selectedStudent ? (selectedStudent.height = height) : console.log("error");
};

export const getAbilitiesNames = (students: any) => {
  return students.map((student: any) => student.base_experience);
};
