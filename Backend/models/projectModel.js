const db = require("../config/db");

const createProject = (
  user_id,
  title,
  prompt,
  generated_code,
  framework,
  callback
) => {
  const sql = `
    INSERT INTO projects
    (user_id, title, prompt, generated_code, framework)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, title, prompt, generated_code, framework],
    callback
  );
};

const getProjectsByUser = (user_id, callback) => {

    const sql = `
        SELECT *
        FROM projects
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], callback);
};

const getProjectById = (project_id, user_id, callback) => {

    const sql = `
        SELECT *
        FROM projects
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [project_id, user_id], callback);

};


const updateProject = (
    project_id,
    user_id,
    title,
    prompt,
    generated_code,
    framework,
    callback
) => {

    const sql = `
        UPDATE projects
        SET title = ?,
            prompt = ?,
            generated_code = ?,
            framework = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [
            title,
            prompt,
            generated_code,
            framework,
            project_id,
            user_id,
        ],
        callback
    );

};

const deleteProject = (project_id, user_id, callback) => {

    const sql = `
        DELETE FROM projects
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [project_id, user_id], callback);

};


const getFilteredProjects = (
    user_id,
    search,
    framework,
    limit,
    offset,
    callback
) => {
    let sql = "SELECT * FROM projects WHERE user_id = ?";
    const values = [user_id];

    if (search) {
        sql += " AND title LIKE ?";
        values.push(`%${search}%`);
    }

    if (framework) {
        sql += " AND framework = ?";
        values.push(framework);
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    values.push(limit, offset);

    db.query(sql, values, callback);
};


module.exports = {
  createProject,
  getProjectsByUser,
  getProjectById,
  getFilteredProjects,
  updateProject,
  deleteProject,

};