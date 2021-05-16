const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
//user model에 user정보를 저장하기 전에 비밀번호를 암호화시키는 작업.
userSchema.pre("save", function (next) {
  var user = this; //model에담겨져있는 것을 가르킴

  //비밀번호를 바꿀때만 조건을 건다 (이메일 기타등등을 변경할때도 비밀번호가 암호화되는것을 방지)
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next(); //.src/index로 넘김
  }
});

//복호화된 암호를 맞는지 확인 하는 작업.
userSchema.methods.comparePassword = function (painPassword, cb) {
  // console.log("p::", painPassword, this.password);
  bcrypt.compare(painPassword, this.password, function (err, isMatch) {
    console.log("result", err, isMatch);
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};
//jwt토큰 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;

  var token = jwt.sign(`${user._id}`, "secretToken");

  //위에 모델에 있는 token에 값을 넣음.
  user.token = token;
  user.save(function (err, user) {
    console.log(err);
    if (err) return cb(err);
    cb(null, user);
  });
};
//로그아웃 토큰 만들어진거 삭제.
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //token을 가져오는곳
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 찾은다음
    //클라이언트랑 token과 db에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

//schema를 model로 감싸고 model의 이름을적어주고, schema의 이름을 적어줌
const User = mongoose.model("User", userSchema);
//따른곳에서 쓸 수 있게 설정.
module.exports = { User };
