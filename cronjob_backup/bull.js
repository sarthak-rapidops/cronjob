const queue = require('bull')
const nodemailer = require('nodemailer')

// initiating the queue
const sendMailQueue = new queue('sendMail', {
    redis:{
        host:'127.0.0.1',
        port:6379,
        password:"root"
    }
})
const data = {
    email:"17mca043@nirmauni.ac.in"
}
const options = {
    delay: 60000, // 1 min 
    attempts: 2
}

//producer addind a job to the queue
sendMailQueue.add(data, options)

//consumer

sendMailQueue.process(async job => {
    return await sendMail(job.data.email)
})


function sendMail(email) {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from:"shahsarthak.3222@gmail.com",
            to:email,
            subject:"mail sending",
            text:"mail sending using bull job scheduling"
        }
        let mailConfig = {
            service:"gmail",
            auth: {
                user:"shahsarthak.3222@gmail.com",
                pass:"sarthak2903"
            }
        }
        nodemailer.createTransport(mailConfig).sendMail(mailOptions, (err, info) =>{
            if(err){
                reject(err)
            } else{
                resolve(info)
            }
        })
    })
}