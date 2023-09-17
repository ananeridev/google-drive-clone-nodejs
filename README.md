# Google-drive-clone-nodejs ]
Project that makes a clone of google drive using nodejs streams and javascript best practices

## Checklist Features

- Web API
    - [x] It should list downloaded files
    - [x] It must stream files and save them in disk
    - [x] It should notify about progress of storing files to disk
    - [x] It must allow uploading of files in image, video or audio format
    - [x] It must reach 100% code coverage in tests

- Web App
    - [x] Should list downloaded files
    - [x] Should allow uploading of files of any size
    - [x] Must have upload function via button
    - [x] Should display upload progress
    - [x] Must have drag and drop upload function


## Features that Im working on :construction:

1. *Backend*: Save the file to AWS or any storage service
     - Our project today stores files on disk. the challenge is you via Stream, uploading to some cloud service
     - As a plus, keep 100% code coverage, that is, create tests for your new feature
2. *Frontend*: Add frontend tests and achieve 100% code coverage
    - You learned how to test in the backend. Use the same process to create frontend unit tests with Jest
    - If you have any doubts, go to [example](https://github.com/ErickWendel/tdd-frontend-example) and leave a star!
3. *Infrastructure*: Publish application with your custom SSL in virtual machine
    - You learned how to generate local SSL, the challenge is for you to create a certificate (it can be with *Let's Encrypt*) and add it to your application
