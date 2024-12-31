# Project Title 
To create a login page template for future use

## Description 
I want to create a general login page template with correct programming practice,
in this project i will use html, scss, npm, Nodejs, git, GitHub to developed and maintain the code,
besides that I also try to use npm generated package.json to create script to automate my 
package dependencies' installation, version checking and update the package if needed

Still learning what is the correct work flow to ensure i am able to deploy the 
development environment at different system without any problem

## Installation 
1. to clone from repository
> git clone https://github.com/momomozakiki/loginpage.git

2. Installs all dependencies.
> npm install

```
"scripts": {
  "build:css": "webpack --mode production",  // Webpack handles SCSS to CSS, prefixing, and minification
  "dev:css": "webpack --mode development",   // Webpack for SCSS in development mode
  "build:js": "webpack --mode production",   // JavaScript bundling for production
  "dev:js": "webpack --mode development",    // JavaScript bundling for development
  "watch": "webpack --watch",                // Watch files for changes (SCSS and JS)
  "lint:js": "eslint src/**/*.js --fix",     // Lint and fix JavaScript files
  "check:outdated": "npm outdated",          // Check outdated dependencies
  "build": "npm run build:css && npm run build:js",  // Combined build for CSS and JS
  "start": "webpack serve --open",           // Start the development server with Webpack
  "postinstall": "npm run build"             // Build after dependencies are installed
},
```

3. Runs the build process.
> npm run build

4. Starts the development server.
> npm run start

5. ddd



## Common use command
### Git Command
| Git Command                                    | Description                                                                  | TBA  |
|------------------------------------------------|------------------------------------------------------------------------------|------|
| git pull origin main                           | pull updates from remote repository url                                      | TBA  |
| git branch                                     | check the current branch                                                     | TBA  |
| git branch -a                                  | check all the local and remote branch                                        | TBA  |
| git branch -r                                  | check all remote branch                                                      | TBA  |
|                                                |                                                                              | TBA  |
| git diff main                                  | This shows the differences between the current branch and main               | TBA  |
| git diff main..<current-branch>                | This compares changes between main and the current branch in both directions | TBA  |
| git merge main                                 | bring the latest changes from main into the current branch                   | TBA  |
|                                                |                                                                              | TBA  |
| git checkout <branch-name>                     | checkout to the specific (***branch***)                                      | TBA  |
| git checkout -b <new-branch>                   | checkout and create new branch and clone from main branch                    | TBA  |
| git remote -v                                  | show the current origin remote url                                           | TBA  |
| git remote set-url origin <new-repository-url> | change to new repository url                                                 | TBA  |
|                                                |                                                                              | TBA  |
| git status                                     | check any changes of current branch                                          | TBA  |
| git add <file>                                 | add only the specific file                                                   | TBA  |
| git add .                                      | add all the modified file                                                    | TBA  |
| git commit -m "Comment"                        | commit the changes to the current branch                                     | TBA  |
| git push origin ***main***                     | push the current branch (***main***) to remote repository                    | TBA  |

### Npm Command
| Npm Command                                  | Description                                                                                          | TBA  |
|----------------------------------------------|------------------------------------------------------------------------------------------------------|------|
| npm init                                     | Run npm init or npm init -y to Create package.json                                                   | TBA  |
| npm init -y                                  | it will create a package.json with default values.                                                   | TBA  |
| npm install                                  | Installs all dependencies                                                                            | TBA  |
| npm install <package-name> --save-dev        | install (package-name) and save the package in the package.json dependencies                         | TBA  |
| npm run build                                | Runs the build process                                                                               | TBA  |
| npm run start                                | Starts the development server                                                                        | TBA  |
| npm outdated                                 | check all the dependencies is the latest version or not                                              | TBA  |
| npm update                                   | To update all dependencies to the latest versions                                                    | TBA  |
| npm install <package-name>@latest            | To update a specific dependency to its latest version                                                | TBA  |
| npm install <package-name>@latest --save-dev | To update a specific dependency to its latest version and save save at the package.json dependencies | TBA  |
|                                              |                                                                                                      | TBA  |


## Important Note
> className
```
Both className={styles.icon} and className={styles['icon']} work the same way in this specific case, because icon is a valid JavaScript identifier (no special characters or hyphens).

- When to use dot notation (styles.icon)
Use it whenever the class name is a valid JavaScript identifier (e.g., icon, buttonPrimary).
It's more readable and considered a cleaner syntax.

- When to use bracket notation (styles['some-class'])
Use it when the class name contains characters that are not valid in dot notation (e.g., hyphens, numbers at the start, special symbols: .some-class, .2columns, etc.).
If you need to dynamically access a class name (e.g., styles[someDynamicKey]), bracket notation is necessary.
```



