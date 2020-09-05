import Mail from '../lib/Mail.js'

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
    priority: 3,
  },
  handle: async ({ data }) => {
    const { user } = data
    await Mail.sendMail({
      from: 'OROMAR DANTAS <oldm@cin.ufpe.br>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de Usuário',
      html: `Olá ${user.name}, bem-vindo !!!`,
    })
  },
}
