# API Rest com mongoDB
Olá a todos, este é um CRUD Api utilizando o mongodb e o estilo de arquitetura de software REST. 

## Rotas:
* **🔑 apiRegister:** Resgistra um novo usuário na base de dados
* **🔐 apiLogin:** Loga um usuário e retorna um token para acessar endpoints privados
* **🔨 crudCreate:** Adiciona uma nova Person no banco de dados
* **📖 crudRead:** expõe todos os objetos cadastrados
* **🔎 crudFindOne:** expõe um objeto específico
* **🆙 crudUpdate:** atualiza objetos com base nos dados enviados
* **🗑️ crudDelete:** exclui objetos com base nos dados enviados

## Tecnologias utilizadas:
* [Node.js](https://nodejs.org/en/): Server Side
* [Javascript](https://www.javascript.com/): Linguagem de programação
* [Express.js](https://expressjs.com/pt-br/): framework
* [Mongoose](https://mongoosejs.com/): ODM
* outras: nodemon, jsonwebtoken, bcrypt, dotenv e body-parser.

## Como utilizar as rotas:
primeiramente é necessário instalar o `Postman` na sua máquina para fazer as requisições. 

### **crudResgister:**
* Na rota de registro é necessário que seja enviado os campos **nome, email, senha, confirme_senha** em formato `JSON` no body da sua requisição, logo após você receberá uma mensagem informando o estado da requisição.
### **crudLogin:**
* Na rota de login, será necessário somente repetir o email e a senha, caso obtenha sucesso, você receberá um token para ter acesso aos endpoints privados.
### **crudRead:**
* para rota crudRead, basta que você envie uma requisiçao no formato `GET` para o servidor sem nenhum parâmetro e receberá como resposta uma lista de todos os objetos cadastrados no banco.
### **crudCreate:**
* essa rota insere elementos no banco de dados, para isso é necessário que seja enviado os campos **nome (String, Obrigatório), sobrenome (String, Obrigatório), ocupacao (String) e idade (Number)** em formato `JSON` no body da sua requisição
### **crudfindOne:**
* para utilizar essa rota é necessário o envio de um parâmetro adicional com o `_id` do objeto que deseja, a resposta será a amostra detodos os campos do elemento desejado.
### **crudUpdate:**
* no crudUpdate, você também deve enviar o `_id` como parâmetro, e, deve enviar quais campos de elemento desejado você deseja alterar no body da requisição em formato `JSON`
### **crudDelete:**
* No crudDelete, será necessário somente o envio de um ou mais campos no body da requisição no formato `JSON` especificando qual ou quais elementos serão deletados. **Lembrando que o método delete irá apagar todos os elementos que forem compatíveis com os campos inseridos**

## Como utilizar o token:
* Um token será disponibilizado para cada usuário no ato do login, para utiliza-lo você precisa somente copiar e colar na área de `Authentication\Bearer token` no `Postman`
