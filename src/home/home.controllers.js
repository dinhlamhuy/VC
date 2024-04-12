const homeModel = require("./home.models");
const { createResponse } = require("../../variables/createResponse");
exports.login = async (req, res) => {
  //   console.log(req);
  const userID = req.body.user;
  const password = req.body.password;
  const socketID = req.body.socket;
  const userInfo = {
    username: userID,
    password: password
    
  };
  const updatetoken={
    socketID: socketID,
    userID: userID,
  }
  const user = await homeModel.getAuth(userInfo);
  if (
    user === null
    // || user?.DT_UserID !== userID
  ) {
   
    return res.status(401).send(
      createResponse(1003, "Tên đăng nhập hoặc mật khẩu không chính xác!", {
        username: username,
        password: password,

      })
    );
  }
  const result = await homeModel.update_Token(updatetoken);
  const mine= await homeModel.getMine({userID:user.DT_UserID});
  var io = req.app.get("socketio");
  io.emit("getUser",Math.random())
  return res.send(createResponse(0, "Đăng nhập thành công!", { mine }));
};

exports.GetUser = async (req, res) => {
  const user = await homeModel.getUser();
//   console.table(user);
  return res.send(createResponse(0, "Thành công", { user }));
};
exports.updateToken = async (req, res) => {
  var io = req.app.get("socketio");
  const userID = req.body.user;
  const socketID = req.body.socket;
  const userInfo = {
    socketID: socketID,
    userID: userID,
  };

  const result = await homeModel.update_Token(userInfo);
  //   console.table(user);
  if(result > 0){
    io.emit("getUser", 'add'+Math.random())
  }
  return res.send(createResponse(result, "Thành công", { }));
};



