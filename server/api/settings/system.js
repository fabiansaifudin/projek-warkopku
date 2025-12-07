const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
// const Kelas = require('../models/kelas.model');
// const Role = require('../models/role.model');
const multer = require('multer');
const path = require('path');

// function generateAccessToken(username) {
//     return jwt.sign({ data: username }, "process.env.TOKEN_SECRET", {
//         expiresIn: "1h",
//     });
// }

// function sendEmail(to, subject, body) {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'fabiansm4@gmail.com',
//             pass: 'jctukecsgudqstiv'
//     }
//     });

//     const mailOptions = {
//         from: 'gymadmin@gmail.com',
//         to: to,
//         subject: subject,
//         text: body
//     };
    
//     const info = await transporter.sendMail(mailOptions);

//     console.log(info.messageId);
// }

// async function createDefault() {
//     const kelas = [
//         {classId: 1, name: "Ringan"},
//         {classId: 2, name: "Berat"}
//     ]
//     const role = [
//         {role: 1, name: "Admin"},
//         {role: 2, name: "User"}
//     ]

//     const cls = await Kelas.find({});
//     const rl = await Role.find({});

//     if (cls.length == 0 || rl.length == 0) {
//         Kelas.create(kelas);
//         Role.create(role);
//         console.log("Table class created");
//     } else {
//         console.log("Table class already");
//     }
// }

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'api/uploads/images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 2 * (1024^2)   // 2 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

// Video Upload
const videoStorage = multer.diskStorage({
    destination: 'api/uploads/videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: 10 * (1024^2)   // 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {     // upload only mp4 and mkv format
            return cb(new Error('Please upload a Video'))
        }
        cb(undefined, true)
    }
})


module.exports = {
    // generateAccessToken,
    // sendEmail,
    // createDefault,
    imageStorage,
    imageUpload,
    videoStorage,
    videoUpload
}