
#!/bin/bash

# Load Nix environment
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi

# Ensure Node.js and npm are available
if ! command -v node &> /dev/null; then
    echo "Installing Node.js environment..."
    nix-env -iA nixpkgs.nodejs_20 nixpkgs.nodePackages.npm
fi

# Install project dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing project dependencies..."
    npm install
fi

echo "Environment setup complete!"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
