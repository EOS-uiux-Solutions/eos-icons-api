# EOS Icon picker
[![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)




## Running the project

- Cloning the repo:
````
git clone https://github.com/EOS-uiux-Solutions/eos-icons-api
````
- Once the repository is cloned, You can choose the way you prfer: 

### | Using Docker: 
  By using our docker image, we will take care of everything</br> 
  - **Steps**:
    - Make sure that docker is installed in your device
    - Modify the `REDISCLOUD_URL` enviroment variable to `redis://redis:6379` (For the server to connect to the redis image)
    - Modify the `MongoURI` enviroment variable to `mongodb://mongo:27017/eosiconsdb` (For the server to connect to the mongo image)
    - From within the cloned respository run the following command to build the image: </br>
  ````
  docker-compose up
  ````
  - Your server container will be started at `http://localhost:3131`
  - Mongo database can be accessed from MongoDB compass at `mongodb://mongo:27017/eosiconsdb`

### | Running on your machine:
  - **Steps**:
    - Install the required python dependencies:
      - On OSX: 
        ```
        brew install ttfautohint fontforge --with-python
        ```
        You will need to have Xcode installed. First install the command line tool:

        ```
        xcode-select --install
        ```

        And then download the latest version from:

        https://developer.apple.com/xcode/
      
      - On Linux: 
        ```
        sudo apt-get install fontforge ttfautohint
        ```
    - Install MongoDB: 
      https://docs.mongodb.com/manual/installation
    - Install Redis: 
      https://redis.io/topics/quickstart
    - Install the dependenices and run the server: 
    1. Install dependencies using `npm install`
    2. Install grunt globally `npm install -g grunt-cli`
    3. Start the server using `npm start`
    - Your server will be started at `http://localhost:3131`


## Contributing: 

- Follow the instructions in the previous section for the installation 
- Make sure to run the tests after any modification, or add new one for any addition. 
1. For `V1` APIs we're using Postman tests, which can be started using `npm run test:v1`
2. For `V2` APIs we're using Mocha tests, which can be started using `npm run test:v2`
3. You can test All the APIs using `npm run test` 


## Learn more about the EOS UX/UI Solutions

- [EOS Icons](https://eos-icons.com)

- [EOS User Story](https://userstory.site)

- [Follow us on Twitter](https://twitter.com/eos_uxui)

- [Join us on Slack](https://slack.userstory.site)


### Our "thank you" section

### Tested for every browser in every device

Thanks to [Browserstack](https://www.browserstack.com) and their continuous contribution to open source projects, we continuously test the EOS to make sure all our features and components work perfectly fine in all browsers.
Browserstack helps us make sure our Design System also delivers a peace of mind to all developers and designers making use of our components and layout in their products.
