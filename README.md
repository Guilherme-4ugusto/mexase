# 🥗 Mexase - Sistema de Gestão Nutricional

O **Mexase** é uma aplicação backend desenvolvida em **Node.js + TypeScript**, que tem como objetivo gerenciar consultas, pacientes, nutricionistas e informações relacionadas à nutrição.  
A API utiliza **Prisma ORM** para comunicação com o banco de dados MySQL e implementa autenticação baseada em **JWT**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma ORM**
- **MySQL**
- **JWT (JSON Web Token)**

---

## 📂 Estrutura do Projeto

```
mexase-main/
 ├── src/
 │   ├── server.ts            # Ponto de entrada da aplicação
 │   ├── controllers/         # Controladores da API
 │   ├── dtos/                # Data Transfer Objects
 │   ├── common/enums/        # Enumerações do sistema
 │   └── ...                  
 ├── package.json
 ├── tsconfig.json
 └── .env
```

---

## ⚙️ Configuração do Ambiente

O projeto utiliza variáveis de ambiente para configuração.  
Exemplo de `.env`:

```env
PORT=3030
DATABASE_URL="mysql://root:admin@localhost:3306/mexase"
JWT_SECRET=unitnutricionismo
JWT_EXPIRES=3600
```

- **PORT** → Porta onde a aplicação será executada  
- **DATABASE_URL** → URL de conexão com o banco MySQL  
- **JWT_SECRET** → Chave secreta para geração dos tokens JWT  
- **JWT_EXPIRES** → Tempo de expiração do token (em segundos)

---

## ▶️ Como Rodar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/mexase.git
cd mexase-main
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar o banco de dados
Antes de rodar as migrations, verifique se o MySQL está rodando e se a URL no `.env` está correta.

```bash
npx prisma migrate dev
```

### 4️⃣ Rodar a aplicação
```bash
npm run dev
```

A API estará disponível em:  
👉 `http://localhost:3030`

---

## 🔑 Autenticação

- A aplicação utiliza **JWT** para autenticação.
- Para acessar rotas protegidas, é necessário enviar o token no header:
  ```
  Authorization: Bearer SEU_TOKEN
  ```

---

## 📜 Scripts Disponíveis

No `package.json` você encontrará alguns scripts úteis:

```bash
npm run dev       # Rodar em ambiente de desenvolvimento
npm run build     # Compilar o projeto TypeScript
npm run start     # Executar o build em produção
```

---

## 🛠️ Próximos Passos

- [ ] Documentar endpoints com Swagger ou Postman  
- [ ] Criar testes automatizados  
- [ ] Adicionar CI/CD  

