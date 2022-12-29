const yup = require("yup");

//Iniciando a API
const getApi = async(req, res) => {
    try {
        return res.status(200).json({message: "WELCOME TO API"});
    } catch (error) {
            return res.status(500).json(error);
    }
};

const verify =  async (req, res) => {
    const {password} =  req.body;
    
    // Na função getPass será feita a verificação do caracter que se repertir.
    
    const getPass = async = (password) =>{
        let arrayObject =[]
        
        // Aqui utilezei alguns métodos de javascript para filtrar os caracters.
        
        const objects = {
            password: password
            .match(/(.)\1*/g)
            .sort((a,b) => b.length - a.length)
            .filter((a,i,arr) => a.length === arr[0].length)
        }
        
        arrayObject += objects.password
        
        // Quando então realizada a identificação da repetição.
        // A condicional irá verificar se existe algum elemento do tamanho (=== 2)
        // atribuida a variavél arrayObject. Caso ocorra significa que exite um caracter repetido
        // na mesma sequência.
        
        if(Object.keys(arrayObject).length === 2){
            return res.status(400).json({
                Message:"Não pode repetir um caractere na mesma sequência"
            });
        }
   
    }
    getPass(password)
 
    // Nessa parte do código escolhi utilizar a lib YUP. Ela é muito utilizada
    // em verificações grandes, o que reduz a quantidade de código e
    // garanti uma qualidade de uma implementação melhor.
    // Com ela consegui verificar os requisitos dos caracteres exigidos.
    
    const schema = yup.object({
        password: yup
        .string()
        .min(8)
        .matches(/[0-9]/)
        .matches(/[a-z]/)
        .matches(/[A-Z]/)
        .matches(/[^\w]/)

    });
   
    // Se a verificação ocorrer de forma incorreta, ocorrerá um erro JSON(400).
    // O que impedirá no retorno dos objetos.
    
    if (!(await schema.isValid(req.body))){
        return res.status(400).json({
            erro: "Erro de validação. Verifique se foi insirido cada requisito para o password."
        })
    }
    
    // Através das variáveis ,minDigit e minSpecialChars, será identificado
    // a presença de cada uma no objeto password.
    
    const minDigit = password.replace(/[^0-9]/g,'');
    const minSpecialChars = password.replace(/[^\W]/g,'');
    

    // Feito isso finalizamos a API com o uso tryCatch, que retorna os objetos
    // ou retorna um erro JSON(500) caso aconteça algum erro na implementação.
   
    try {
         // Usando os objetos juntamente com o método length, para retornar
         // de forma personalizada a quantidade de cada item do caracter.
        
         return res.status(200).json({
            Password: `${password}`,
            MinSize: `Value: ${password.length}`,
            MinSpecialSize: `Value: ${minSpecialChars.length}`,
            NoRepeted: `Value: 0`, 
            // No NoRepeted deixei o valor fixado pois esse bloco de codigo só será
            // executado caso esteja tudo certo na condiciona getPass.
            MinDigit: `Value: ${minDigit.length}`,

        });
    } catch (error){
         return res.status(500).json(error);
    };
    
}

module.exports = {getApi, verify}

// Inicie a API com o comando "npm start" ou "node index.js".
// No meu teste utilizei a plataforma POSTMAN:

//    Método POST 
//    http://localhost:3000/verify
//    {
//       "password" : "bhas643.@#ada9ndcAH*"
//    }

// RESPOSTA DA API:
/* 
    {
        "Password": "bhas643.@#ada9ndcAH*",
        "MinSize": "Value: 20",
        "MinSpecialSize": "Value: 4",
        "NoRepeted": "Value: 0",
        "MinDigit": "Value: 4"
    } 
*/








