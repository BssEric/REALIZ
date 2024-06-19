const fs = require('fs');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// Carregar as credenciais do arquivo JSON
const CREDENTIALS = JSON.parse(fs.readFileSync('src/config/credentials.json'));

// Definir os escopos necessários
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Configurar a autenticação OAuth2
const { client_secret, client_id, redirect_uris } = CREDENTIALS.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Definir tokens de acesso (substitua com seus tokens válidos)
oAuth2Client.setCredentials({
  access_token: 'ACCESS_TOKEN',
  refresh_token: 'REFRESH_TOKEN',
});

// Função para criar a mensagem de e-mail
function createMail(to, from, subject, message) {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        return reject(err);
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: from,
          clientId: client_id,
          clientSecret: client_secret,
          refreshToken: oAuth2Client.credentials.refresh_token,
          accessToken: oAuth2Client.credentials.access_token,
        },
      });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve(info);
      });
    });
  });
}

// Enviar o e-mail
async function sendEmail() {
  try {
    const email = await createMail(
      'user-email@example.com',
      'your-email@gmail.com',
      'Assunto do Email',
      'Conteúdo do email'
    );
    console.log('Email enviado: ', email);
  } catch (error) {
    console.log('Erro ao enviar o email: ', error);
  }
}

sendEmail();
