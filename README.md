# Lab3-Docker-Ansible

- Name: Sean Kee
- SLU username: skee001
- K: 48

## Video Demo
https://youtu.be/ziwLnWX1CZA

## Run with Docker Compose

From the project root, copy the example environment file:
- cp .env.example .env

Change the value in .env to my personal Compose host port: 
- HTTP_PORT=8248

Start the Services using
- docker compose -p courses-local up -d --build

Check the API using this command:
- curl -i http://localhost:8248/health

## Deploy with Ansible

With Ansible and the community.docker collection installed, run this:
- ansible-playbook -i inventory.ini deploy.yml -e http_port=8348

Then, Check the deployed API:
- curl -i http://localhost:8348/health
