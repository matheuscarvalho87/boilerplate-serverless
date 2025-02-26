# 🚀 Serverless Node.js Boilerplate

## 📌 What is this?
A boilerplate to simplify the creation of **Node.js** serverless projects using the **Serverless Framework** and **Middy** for request handling.

## ✅ Features Implemented
- [x] **Lambda Functions**
- [x] **Cognito Authentication**
  - Sign-up
  - Sign-in
  - Refresh token
  - Confirm account
  - Forgot password
  - Reset password
- [x] **Cognito Authorizer**
- [ ] **S3 Configuration** *(In Progress)*
- [ ] **File Upload** *(In Progress)*
- [x] **Users Management**
  - Retrieve user information
- [ ] **DynamoDB Integration** *(To be done)*
- [ ] **SQS Integration** *(To be done)*

## 🚀 How to Use
1. Configure AWS CLI with your credentials:
   ```sh
   aws configure
   ```
2. Install the **Serverless Framework**:
   ```sh
   npm install -g serverless
   ```
3. Update `serverless.yml`:
   - Replace **`changeHere`** with a meaningful name for your service.
4. Deploy your application:
   ```sh
   sls deploy
   ```

## 📌 Technologies Used
- **Node.js**
- **AWS Lambda**
- **AWS Cognito**
- **AWS S3** (Planned)
- **AWS DynamoDB** (Planned)
- **AWS SQS** (Planned)
- **Middy**
- **Serverless Framework**

## 📜 License
This project is licensed under the **MIT License**.

---

🎯 *Contributions are welcome! Feel free to submit issues and pull requests.*
