import nodemailer from 'nodemailer'
import config from '../config/mail.js'

export default nodemailer.createTransport(config)
