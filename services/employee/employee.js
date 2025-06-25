import Repository from '../../repositories/repo.js';
import { employeeSchema, employeeUpdateSchema } from '../../entity/employee.js';
import { generateNIP } from '../../utils/generate_nip.js';

const employeeRepo = Repository.Employee;

const listEmployees = async ({ keyword = '', start = 0, count = 10 }) => {
  if (isNaN(start) || isNaN(count)) throw new Error('Start & Count harus angka');

  const employees = await employeeRepo.getAll(keyword, parseInt(start), parseInt(count));
  if (!employees.length) throw new Error('Data karyawan tidak ditemukan');

  return employees;
};

const getUserById = async (id) => {
  if (!id) throw new Error('User ID is required');
  return await employeeRepo.getById(id);
};

const registerEmployee = async (data) => {
  const { error } = employeeSchema.validate(data);
  if (error) throw new Error(error.details[0].message);

  const nip = await generateNIP();
  const existing = await employeeRepo.getByNip(nip);
  if (existing) throw new Error('NIP already exists');

  const payload = {
    ...data,
    nip,
    insert_at: new Date(),
  };

  const result = await employeeRepo.create(payload);
  return { id: result.insertId, ...payload };
};

const updateEmployee = async (nip, data) => {
  if (!nip) throw new Error('NIP wajib diisi');

  const { error } = employeeUpdateSchema.validate(data);
  if (error) throw new Error(error.details[0].message);

  const existing = await employeeRepo.getByNip(nip);
  if (!existing) throw new Error('Karyawan tidak ditemukan');

  const result = await employeeRepo.updateByNip(nip, data);
  if (result.affectedRows === 0) throw new Error('Gagal mengupdate data');

  return { message: 'Berhasil update karyawan', nip };
};

const deactivateEmployee = async (nip, update_by) => {
  if (!nip || !update_by) throw new Error('NIP dan update_by wajib diisi');

  const existing = await employeeRepo.getByNip(nip);
  if (!existing) throw new Error('Karyawan tidak ditemukan');

  const result = await employeeRepo.deactivateByNip(nip, update_by);
  if (result.affectedRows === 0) throw new Error('Gagal menonaktifkan karyawan');

  return { message: `Karyawan ${nip} berhasil dinonaktifkan` };
};

export default {
  listEmployees,
  getUserById,
  registerEmployee,
  updateEmployee,
  deactivateEmployee,
};
