import userService from '../../services/employee/employee.js';

export const listEmployees = async (req, res) => {
   try {
    const { keyword = '', start = 0, count = 10 } = req.query;
    const result = await userService.listEmployees({ keyword, start, count });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEmployees = async (req, res) => {
  try {
    req.body.insert_by = req.user.username
    const newUser = await userService.registerEmployee(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    req.body.update_by = req.user.username
    const { nip } = req.params;
    const result = await userService.updateEmployee(nip, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const deactivateEmployee = async (req, res) => {
  try {
    const { nip } = req.params;
    const { username } = req.user;

    const result = await userService.deactivateEmployee(nip, username);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
