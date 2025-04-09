This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Note

Please create `.env` file and copy all env vars present in the `.env.example`
update values as per need

## Env variables details
GITHUB_TOKEN= token needed for LLVM action trigger\
DB_USER= mysql db root user\
DB_PASSWORD= db root password\
ARM_NODE_IP= arm machine ip address\
X86_NODE_IP= x86 machine ip address


## Getting Started

### Tech Stack Used:

```NodeJs - 22.12.0\
NodeJs - 22.12.0
NextJs - 15.1.4
Chakra UI - 3.3.1
@kubernetes/client-node - 1.0.0
```

### Prerequisites

1. Check if you have NodeJs installed using `node -v`
2. If not, install NodeJs using NVM (node version manager)
3. Follow the steps mentioned in the\
   [installation steps for Node Js](#installation-steps-for-node-js)
4. If node is installed, check the version using `node -v`
5. If the version is not 22.12.0, install NodeJs using NVM
6. If Node is correctly installed, then check this section \
   [Install required packages](#install-required-packages)

### Installation steps for Node Js

#### Install NVM (node version manager)

1. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`

2. Restart the terminal

3. Check NVM is installed

4. nvm --version (It will show output like
   0.40.1)
5. Install NodeJs using NVM `nvm install 22.12.0`

6. Use NodeJs `nvm use 22.12.0`

### Install required packages

1. Install all the required packages with below command (This will install all the packages like Chakra UI, Next Js,
   @kubernetes/client-node etc.) `npm i`

2. Build the project using `npm run build` This will create production ready build of the project in the `.next`
   folder\
   (*This step is not required if you are running the project locally*)

### Running the project

#### Local Environment

1. Run the project using `npm run dev`
2. Head over to `http://localhost:3000` to view the app (3000 is default port)

#### Production Environment

*Note: Please make sure after every change in the code, you have to run `npm run build` to create the production ready
build.*

1. Install pm2 (Process manager to run app in background) `npm install pm2 -g`

2. Run project with pm2\, in the path `~/Whileone_Demo$` \
   `pm2 start npm --name ampere-cluster-demo-new -- run start -- -p 4000`

3. Check status of the app\
   `pm2 list ampere-cluster-demo-new`

4. Verify app is accessible at given port.\
   `http://<machine-ip>:4000`

5. To stop the app\
   `pm2 stop ampere-cluster-demo-new`

6. To start again\
   `pm2 start ampere-cluster-demo-new`

7. To Restart the app
   `pm2 restart ampere-cluster-demo-new`

8. To delete the app
   `pm2 delete ampere-cluster-demo-new`

