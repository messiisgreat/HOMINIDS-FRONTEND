#!/bin/bash
cd /home/ubuntu/Marketplace
# sudo apt install curl 
sudo git fetch --all
sudo git reset --hard origin/beta
npm install -g n
n 20
npm cache clean --force
npm install
npm run build
export PATH="$PATH:/home/ubuntu/Marketplace/node_modules/pm2/bin"
pm2 kill
pm2 start npm --name dapp -- run start -- -p 80

