#!/usr/bin/env node

const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve();
    });
  });
};

const deployToVercel = async () => {
  try {
    // Check for linting errors
    console.log('Checking for linting errors...');
    try {
      await executeCommand('npm run lint');
      console.log('✅ Linting passed!');
    } catch (error) {
      console.error('❌ Linting failed. Please fix the errors before deploying.');
      process.exit(1);
    }

    // Run build to check for build errors
    console.log('Testing build process...');
    try {
      await executeCommand('npm run build');
      console.log('✅ Build passed!');
    } catch (error) {
      console.error('❌ Build failed. Please fix the errors before deploying.');
      process.exit(1);
    }

    // Push to GitHub if everything is good
    console.log('All checks passed! Proceeding to GitHub push...');
    
    // Ask for commit message
    rl.question('Enter your commit message: ', async (commitMessage) => {
      try {
        await executeCommand('git add .');
        await executeCommand(`git commit -m "${commitMessage}"`);
        await executeCommand('git push');
        console.log('✅ Successfully pushed to GitHub!');
        
        // Deploy to Vercel
        console.log('Deploying to Vercel...');
        await executeCommand('npx vercel --prod');
        console.log('✅ Deployment to Vercel complete!');
        
        rl.close();
      } catch (error) {
        console.error('❌ Deployment process failed. See above for details.');
        rl.close();
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ An unexpected error occurred during the deployment process.');
    rl.close();
    process.exit(1);
  }
};

deployToVercel(); 