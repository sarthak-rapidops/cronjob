const nodemailer = require('nodemailer');
const cron = require('node-cron')
const dotenv = require('dotenv')
dotenv.config()

let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.user}`,
            pass: `${process.env.password}`
        }
    });
    //sending mail every mintues
cron.schedule('* * * * * ',()=>{
    const mailOptions = {
        from: `${process.env.user}`, // sender address
        to: `${process.env.touser}`, // list of receivers
        subject: 'test mail', // Subject line
        html: '<h1>this is a test mail.</h1>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    })
})
