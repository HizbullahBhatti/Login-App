import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js'; 


//https://ethereal.email/create

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    }
});

let mailGenerator = new Mailgen({
    theme:'default',
    product:{
        name:"Mailgen",
        link:'https://mailgen.js'
    }
})

export const registerMail = async(req,res)=>{
    try {
        const {username,email,text,subject} = req.body;
        var mail = {
            body:{
                name:username,
                intro:text || "Welcome to Our App",
                outro:"Need help, or have questions? Just reply to this email, we'd love to help.",
                action:{
                    instructions:"To get started with Mailgen, please click here:",
                    button:{
                        color:"#22BC66",
                        text:"Confirm your account",
                        link:"https://mailgen.js/confirm?s=d972f8945d61b8b8c7b0fbd1e2c9f9a1"
                    }
                }
                
            }
        }

        let emailBody = mailGenerator.generate(mail);

        let message = {
            from:ENV.EMAIL,
            to:email,
            subject:subject || "Confirm your account",
            html:emailBody
        }

        let info = await transporter.sendMail(message);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).send({message:"Check your mail for verification"});
    } catch (error) {
        res.status(404).send({error});
    }
}