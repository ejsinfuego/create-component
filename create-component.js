// create-component.js
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .version('1.0.0')
  .arguments('<componentName>')
  .option('--shared', 'Create in shared components directory')
  .option('--ts', 'Create TypeScript component')
  .action((componentName, options) => {
    const baseDir = options.shared
      ? path.join('src', 'client', 'shared_components', options.shared || '')
      : path.join('src', 'client');

    const componentDir = path.join(baseDir, componentName);
    const extension = options.ts ? 'tsx' : 'jsx';

    // Create directory if it doesn't exist
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    } else {
      console.error(`Component ${componentName} already exists!`);
      process.exit(1);
    }

    // Component file content
    const componentContent = `import React from 'react';

interface ${componentName}Props {
  children: React.ReactNode;
}

const ${componentName} = ({ children }: ${componentName}Props) => {
  return (
    <div className="${componentName.toLowerCase()}">
      {children}
    </div>
  );
};

export default ${componentName};
`;
    // Create files
    fs.writeFileSync(path.join(componentDir, `${componentName}.${extension}`), componentContent);


    console.log(`Successfully created ${componentName} component in:`);
    console.log(componentDir);
  })
  .parse(process.argv);
