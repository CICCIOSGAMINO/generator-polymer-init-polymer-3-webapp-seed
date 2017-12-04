'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
let path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the outstanding ' + chalk.red('generator-polymer-init-polymer-3-webapp-seed') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'appNameTag',
      message:
        'What would you like your WebApp Tag to be called ? (web-app)',
      default: 'web-app',
    },
    {
      type: 'input',
      name: 'appDesc',
      message: 'Intro a brief WebApp Description ... (Some WebApp) ',
      default: 'Chamaeleonidae Family WebApp',
    },
    {
      type: 'input',
      name: 'themeColor',
      message: 'What would you like your theme color to be ? (#673AB7)',
      default: '#673AB7',
    }];

    return this.prompt(prompts).then(props => {

      // define the className eg  web-app > WebApp
      props.className = props.appNameTag.split('-').map((x) => {
        return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
      }).join('');

      // define the App Name web-app > Web App
      props.appName = props.appNameTag.split('-').map((x) => {
        return x.charAt(0).toUpperCase() +
        x.slice(1).toLowerCase();
      }).join(' ');

      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // WebApp Seed Path (folder with the WebApp Seed files)
    let webappPath = path.join(
      path.dirname(this.resolved), 'polymer-webapp-seed'
    );

    this.sourceRoot(webappPath);

    // Ready to use the appNameTag
    const appNameTag = this.props.appNameTag;

    // Copy the images 
    this.fs.copy(
      `${this.templatePath()}/images/**/*`,
      `${this.destinationPath()}/images/`
    ); 

    // Copy the sw.js file 
    this.fs.copy(
      this.templatePath('sw.js'),
      this.destinationPath('sw.js')
    );

    // Copy the License File 
    this.fs.copy(
      this.templatePath('LICENSE.md'),
      this.destinationPath('LICENSE.md')
    );

    // Copy the README.md file 
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    // Copy the .gitignore file 
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    // Handle the index.html
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      this.props
    );

    // Handle the package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    // Handle the manifest.json
    this.fs.copyTpl(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json'),
      this.props
    );

    // Handle the polymer.json
    this.fs.copyTpl(
      this.templatePath('polymer.json'),
      this.destinationPath('polymer.json'),
      this.props
    );

    // Copy all files in the polymer-webapp-seed folder but not
    // files starting with _
    // this.fs.copyTpl(
    //  `${this.templatePath()}/**/!(_)*`,
    //  this.destinationPath(),
    //  this.props
    //);

    // prepare and copy the web-app element with right tag name
    this.fs.copyTpl(
      this.templatePath('src/_my-app.js'),
      this.destinationPath(`src/${appNameTag}.js`),
      this.props
    );

    // Copy all files in the folder but not files starting with _
    this.fs.copyTpl(
      `${this.templatePath()}/src/!(_)*`,
      `${this.destinationPath()}/src/`,
      this.props
    ); 
    
  }

  install() {
    // this.installDependencies();
    this.yarnInstall();
  }
};
