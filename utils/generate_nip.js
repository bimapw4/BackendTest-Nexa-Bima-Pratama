import Repository from '../repositories/repo.js';
const employeeRepo = Repository.Employee;

export const generateNIP = async () => {
  const year = new Date().getFullYear();
  const [rows] = await employeeRepo.getByYear(year);
  const count = rows.length + 1;
  const padded = String(count).padStart(4, '0');
  return `${year}${padded}`;
};
