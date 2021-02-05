const connection = require('../configs/db')

class Model {
  constructor(){

  }
  checkEmailStatus(email){
    console.log(email)
    return new Promise((resolve,reject)=>{
      connection.query('SELECT emailVerification FROM users WHERE email = ?',email,(error,results)=>{
        if(!error){
          resolve(results)
        }else{
          reject(error)
        }
      })
    })
  }

  emailVerification(email){
    return new Promise((resolve,reject)=>{
      connection.query('UPDATE users SET emailVerification = 1 WHERE email = ?',email,(error,results)=>{
        if(!error){
          resolve(results)
        }else{
          reject(error)
        }
      })
    })
  }
}
const Email = new Model()
module.exports = Email