# EdgeVoice AWS Deployment Guide

## 🚀 Deployment Options

### Option 1: AWS Elastic Beanstalk (Recommended - Easiest)
Best for: Quick deployment, managed scaling, minimal configuration

### Option 2: AWS EC2
Best for: Full control, custom configuration, learning

### Option 3: Docker + ECS
Best for: Modern containerized deployment, easy CI/CD

---

## 📋 Prerequisites

1. **AWS Account** (Free tier eligible)
2. **AWS CLI** installed locally
3. **Git** configured
4. **Docker** (optional, for ECS/Docker deployment)

---

## 🔧 Setup Steps

### Step 1: Install AWS CLI

```bash
# Windows
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Or using pip
pip install awscli
```

### Step 2: Configure AWS Credentials

```bash
aws configure
```

You'll be prompted for:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (use: us-east-1)
- Default output format (use: json)

Get credentials from AWS Console > IAM > Users

---

## 📦 Option 1: Elastic Beanstalk Deployment

### Step 1: Install EB CLI

```bash
pip install awsebcli
```

### Step 2: Initialize Elastic Beanstalk

```bash
cd "C:\Users\mekal\OneDrive\文档\ai"
eb init -p python-3.11 edgevoice-app --region us-east-1
```

### Step 3: Create Environment

```bash
eb create edgevoice-env
```

### Step 4: Deploy Code

```bash
eb deploy
```

### Step 5: Get App URL

```bash
eb open
```

---

## 🐳 Option 2: Docker + AWS ECS

### Step 1: Build Docker Image

```bash
docker build -t edgevoice:latest .
```

### Step 2: Tag for ECR

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [YOUR_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com

docker tag edgevoice:latest [YOUR_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com/edgevoice:latest
```

### Step 3: Push to ECR

```bash
docker push [YOUR_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com/edgevoice:latest
```

### Step 4: Create ECS Task & Service

Use AWS Console to create:
- ECR Repository
- ECS Task Definition
- ECS Service
- Load Balancer

---

## 🔗 API Endpoints

After deployment, your API will be available at:
```
https://your-app-name.elasticbeanstalk.com/upload
https://your-app-name.elasticbeanstalk.com/accelerate
https://your-app-name.elasticbeanstalk.com/stream_mfcc
```

Update frontend API URLs in `script.js`:
```javascript
const backendUrls = [
  'https://your-app-name.elasticbeanstalk.com/upload',
  'http://localhost:5000/upload'
];
```

---

## 🔒 Security Checklist

- [ ] Enable HTTPS/SSL Certificate
- [ ] Configure Security Groups (restrict access)
- [ ] Set up RDS for database (if needed)
- [ ] Enable CloudWatch logging
- [ ] Configure auto-scaling
- [ ] Set up CloudFront CDN (optional)

---

## 📊 Monitoring

### CloudWatch Logs
```bash
eb logs
```

### View Metrics
```bash
eb status
```

### SSH into Instance
```bash
eb ssh
```

---

## 💰 Cost Estimation

- **Free Tier**: Up to 750 hours/month for t2.micro
- **Estimated Monthly**: $10-30 depending on traffic
- **Frontend CDN**: $0.085 per GB transferred

---

## ❌ Troubleshooting

### Common Issues

1. **FFmpeg not found**
   - Elastic Beanstalk uses Amazon Linux 2
   - Already handled in `.ebextensions/python.config`

2. **CORS issues**
   - Update CORS headers in `app.py`
   - Already configured in code

3. **Memory issues**
   - Upgrade instance type (t3.small)
   - Use environment variable: `FLASK_ENV=production`

4. **Timeout errors**
   - Increase timeout in Gunicorn config
   - Already set to 120 seconds

---

## 📝 Next Steps

1. Choose your preferred deployment option
2. Follow the setup steps for your choice
3. Test the deployed application
4. Configure DNS (optional)
5. Set up CI/CD pipeline (optional)

---

## 🆘 Need Help?

Check AWS Documentation:
- Elastic Beanstalk: https://docs.aws.amazon.com/elasticbeanstalk/
- ECS: https://docs.aws.amazon.com/ecs/
- EC2: https://docs.aws.amazon.com/ec2/

Email AWS Support or check your account plan.
