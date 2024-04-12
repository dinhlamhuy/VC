const db = require("../../connection");
exports.getAuth = async ({ username, password }) => {
  try {
    // console.log("name", username);
    if (username != "undefined" && password != "undefined") {
      const rs = await db.Execute(
        `SELECT [DT_UserID]
     
        ,[DT_Name] FROM DT_User WHERE DT_UserID = '${username}' AND DT_Pass='${password}'`
      );
      console.log(rs.recordset[0])
      return rs.recordset[0] || null;
    }
  } catch (error) {
    return null;
  }
};




exports.getUser = async () => {
  try {
    
      const rs = await db.Execute(
        `SELECT [DT_UserID] ,[DT_Name], DT_Token FROM DT_User  where DT_Token IS NOT NULL AND DT_Token <> '' `
      );
     
      return rs.recordset || null;
    
  } catch (error) {
    return null;
  }
};
exports.getMine = async ({userID}) => {
  try {
    
      const rs = await db.Execute(
        `SELECT [DT_UserID] ,[DT_Name], [DT_Token]  FROM DT_User WHERE DT_UserID='${userID}' `
      );
      // console.log( `SELECT [DT_UserID] ,[DT_Name], [DT_Token]  FROM DT_User WHERE DT_UserID='${userID} `)
     
      return rs.recordset[0] || null;
    
  } catch (error) {
    return null;
  }
};
exports.update_Token = async ({socketID, userID}) => {
  try {
    
      const rs = await db.Execute(
        `UPDATE DT_User SET DT_Token='${socketID}' WHERE  DT_UserID='${userID}'  `
      );
     
      return rs.rowsAffected || null;
    
  } catch (error) {
    return null;
  }
};
exports.remove_Token = async ({socketID}) => {
  try {
    
      const rs = await db.Execute(
        `UPDATE DT_User SET DT_Token='' WHERE  DT_Token='${socketID}'  `
      );
     
      return rs.rowsAffected || null;
    
  } catch (error) {
    return null;
  }
};