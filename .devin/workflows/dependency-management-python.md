---
description: Automate Python dependency management using UV and virtual environments
---

# Python Dependency Management Workflow

## 🎯 Purpose
Automated Python dependency installation, updating, and management using UV package manager with strict virtual environment isolation. Never installs packages system-wide.

## 🚀 Dependency Management Process

### 1. Environment Setup and Validation
**Ensure UV is installed and virtual environment is ready**:

```bash
# Check UV installation
if ! command -v uv >/dev/null 2>&1; then
    echo "🔧 Installing UV package manager..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    source ~/.bashrc  # or source ~/.zshrc for zsh
fi

# Verify UV version
uv --version

# Check if virtual environment exists
if [ ! -d "venv_linux" ]; then
    echo "🔧 Creating virtual environment with UV..."
    uv venv --name venv_linux
    echo "✅ Virtual environment 'venv_linux' created"
else
    echo "✅ Virtual environment 'venv_linux' already exists"
fi

# Activate virtual environment (for manual commands)
echo "💡 To activate manually: source venv_linux/bin/activate"
```

### 2. Dependency File Detection
**Identify dependency configuration files**:

```bash
# Check for dependency files in order of preference
if [ -f "pyproject.toml" ]; then
    echo "📦 Found pyproject.toml - using UV project configuration"
    DEPENDENCY_FILE="pyproject.toml"
    USE_UV_PROJECT=true
elif [ -f "requirements.txt" ]; then
    echo "📦 Found requirements.txt - using pip requirements format"
    DEPENDENCY_FILE="requirements.txt"
    USE_UV_PROJECT=false
elif [ -f "Pipfile" ]; then
    echo "📦 Found Pipfile - using Pipenv configuration"
    DEPENDENCY_FILE="Pipfile"
    USE_UV_PROJECT=false
else
    echo "⚠️ No dependency file found. Creating pyproject.toml..."
    uv init --no-readme
    DEPENDENCY_FILE="pyproject.toml"
    USE_UV_PROJECT=true
fi

echo "📋 Using dependency file: $DEPENDENCY_FILE"
```

### 3. Dependency Installation
**Install dependencies using UV in virtual environment**:

```bash
# For UV projects (pyproject.toml)
if [ "$USE_UV_PROJECT" = true ]; then
    echo "📦 Installing dependencies with UV sync..."
    uv sync
    
    # Check if sync was successful
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    
    # Show installed packages
    echo "📋 Installed packages:"
    uv pip list
else
    # For requirements.txt or other formats
    echo "📦 Installing dependencies with UV pip..."
    
    if [ -f "requirements.txt" ]; then
        uv pip install -r requirements.txt
    elif [ -f "Pipfile" ]; then
        echo "⚠️ Pipfile detected. Consider converting to pyproject.toml for better UV support"
        echo "💡 Run: uv add --dev pipenv && pipenv install"
        pipenv install
    fi
    
    # Verify installation
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi
```

### 4. Development Dependencies Setup
**Install common development dependencies**:

```bash
# Always install essential development tools
echo "🛠️ Installing essential development dependencies..."

# Core development dependencies
DEV_DEPS=(
    "pytest"
    "ruff"
    "mypy"
    "pre-commit"
    "coverage"
    "pytest-cov"
    "pytest-asyncio"
    "black"  # Alternative formatter
    "isort"  # Import sorting
)

# Add development dependencies using UV
for dep in "${DEV_DEPS[@]}"; do
    echo "📦 Adding $dep as development dependency..."
    uv add --dev "$dep" 2>/dev/null || uv pip install "$dep"
done

# Install additional useful tools
USEFUL_DEPS=(
    "ipython"  # Enhanced REPL
    "jupyter"  # Notebooks
    "rich"     # Rich output
    "typer"    # CLI framework
)

for dep in "${USEFUL_DEPS[@]}"; do
    echo "📦 Adding $dep..."
    uv add "$dep" 2>/dev/null || uv pip install "$dep"
done

echo "✅ Development dependencies installed"
```

### 5. Dependency Updates
**Update dependencies safely**:

```bash
# Update all dependencies
echo "🔄 Updating all dependencies..."
uv sync --upgrade

# Update specific package
update_package() {
    local package=$1
    echo "🔄 Updating $package..."
    uv add "$package@latest" || uv pip install --upgrade "$package"
}

# Update security-critical packages
SECURITY_PACKAGES=(
    "cryptography"
    "requests"
    "urllib3"
    "certifi"
    "pydantic"
    "fastapi"
)

echo "🔒 Updating security-critical packages..."
for package in "${SECURITY_PACKAGES[@]}"; do
    if uv pip show "$package" >/dev/null 2>&1; then
        update_package "$package"
    fi
done

# Check for outdated packages
echo "📋 Checking for outdated packages..."
uv pip list --outdated
```

### 6. Dependency Security Audit
**Run security checks on dependencies**:

```bash
# Install security tools if not present
if ! uv pip show safety >/dev/null 2>&1; then
    echo "🔒 Installing safety for dependency security checks..."
    uv add --dev safety
fi

# Run security audit
echo "🔒 Running security audit on dependencies..."
if [ -f "requirements.txt" ]; then
    uv run safety check -r requirements.txt
else
    # Generate requirements from current environment
    uv pip freeze > temp_requirements.txt
    uv run safety check -r temp_requirements.txt
    rm temp_requirements.txt
fi

# Check for known vulnerabilities
if ! uv pip show bandit >/dev/null 2>&1; then
    uv add --dev bandit
fi

echo "🔍 Running code security scan..."
uv run bandit -r . -f json -o bandit-report.json || true
uv run bandit -r . || true
```

### 7. Dependency Cleanup
**Remove unused dependencies and clean environment**:

```bash
# Remove unused packages
echo "🧹 Removing unused dependencies..."

# Find and remove unused packages with pip-autoremove
if ! uv pip show pip-autoremove >/dev/null 2>&1; then
    uv pip install pip-autoremove
fi

# Remove unused dependencies (be careful with this)
echo "⚠️ Review before removing unused dependencies:"
uv pip-autoremove requirements.txt --dry-run

# Clean pip cache
echo "🧹 Cleaning pip cache..."
uv cache clean

# Remove orphaned packages
echo "🧹 Removing orphaned packages..."
uv pip-autoremove requirements.txt -y 2>/dev/null || true
```

### 8. Environment Validation
**Validate the virtual environment setup**:

```bash
echo "🔍 Validating virtual environment..."

# Check Python version
echo "🐍 Python version: $(uv run python --version)"

# Check virtual environment is active
if [ "$VIRTUAL_ENV" != "" ]; then
    echo "✅ Virtual environment is active: $VIRTUAL_ENV"
else
    echo "⚠️ Virtual environment not activated in current shell"
    echo "💡 Run: source venv_linux/bin/activate"
fi

# Test package imports
echo "🧪 Testing package imports..."
uv run python -c "
import sys
print(f'Python executable: {sys.executable}')
print(f'Site packages: {sys.path[-1]}')

# Test common packages
packages = ['pytest', 'ruff', 'mypy', 'pydantic']
for pkg in packages:
    try:
        __import__(pkg)
        print(f'✅ {pkg} import successful')
    except ImportError:
        print(f'❌ {pkg} import failed')
"

# Verify UV project structure
if [ -f "pyproject.toml" ]; then
    echo "📋 UV project configuration:"
    uv project info
fi
```

## 📋 Dependency Management Commands

### Quick Setup Commands
```bash
# Complete setup for new project
setup_python_project() {
    echo "🚀 Setting up new Python project..."
    
    # Initialize UV project
    uv init --name "$(basename "$PWD")"
    
    # Create virtual environment
    uv venv --name venv_linux
    
    # Install development dependencies
    uv add --dev pytest ruff mypy pre-commit coverage
    
    # Setup pre-commit
    uv run pre-commit install
    
    echo "✅ Project setup complete!"
}

# Install from requirements.txt
install_from_requirements() {
    if [ -f "requirements.txt" ]; then
        echo "📦 Installing from requirements.txt..."
        uv pip install -r requirements.txt
        echo "✅ Installation complete"
    else
        echo "❌ requirements.txt not found"
    fi
}

# Add new dependency
add_dependency() {
    local package=$1
    local is_dev=${2:-false}
    
    if [ "$is_dev" = true ]; then
        echo "📦 Adding development dependency: $package"
        uv add --dev "$package"
    else
        echo "📦 Adding dependency: $package"
        uv add "$package"
    fi
}
```

### Maintenance Commands
```bash
# Update all dependencies
update_all_deps() {
    echo "🔄 Updating all dependencies..."
    uv sync --upgrade
    echo "✅ Update complete"
}

# Check for security issues
check_security() {
    echo "🔒 Running security checks..."
    
    # Install safety if needed
    uv add --dev safety 2>/dev/null || true
    
    # Run safety check
    if [ -f "requirements.txt" ]; then
        uv run safety check -r requirements.txt
    else
        uv pip freeze | uv run safety check
    fi
}

# Generate requirements.txt from current environment
generate_requirements() {
    echo "📋 Generating requirements.txt..."
    uv pip freeze > requirements.txt
    echo "✅ requirements.txt generated"
}

# Clean environment
clean_env() {
    echo "🧹 Cleaning virtual environment..."
    uv cache clean
    rm -rf venv_linux
    uv venv --name venv_linux
    echo "✅ Environment cleaned and recreated"
}
```

## 🔧 Configuration Files

### pyproject.toml Template
```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "your-project-name"
version = "0.1.0"
description = "Project description"
authors = [{name = "Your Name", email = "your.email@example.com"}]
license = {text = "MIT"}
readme = "README.md"
requires-python = ">=3.8"
dependencies = [
    "pydantic>=2.0.0",
    "fastapi>=0.100.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0.0",
    "pytest-cov>=4.0.0",
    "pytest-asyncio>=0.21.0",
    "ruff>=0.1.0",
    "mypy>=1.0.0",
    "pre-commit>=3.0.0",
    "coverage>=7.0.0",
]

[tool.ruff]
line-length = 100
target-version = "py38"

[tool.ruff.lint]
select = ["E", "F", "W", "I", "N", "UP", "B", "A", "C4", "T20"]
ignore = ["E501"]

[tool.mypy]
python_version = "3.8"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
addopts = "--cov=src --cov-report=html --cov-report=term-missing"

[tool.coverage.run]
source = ["src"]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise AssertionError",
    "raise NotImplementedError",
]
```

### .gitignore for Python Projects
```gitignore
# Virtual environments
venv_linux/
venv/
env/
.env/
.venv/

# Python cache
__pycache__/
*.py[cod]
*$py.class
*.so
.Python

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
*.manifest
*.spec

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Jupyter Notebook
.ipynb_checkpoints

# pyenv
.python-version

# Environments
.env
.venv

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## 📊 Reporting and Monitoring

### Dependency Report Generation
```bash
# Generate comprehensive dependency report
generate_dependency_report() {
    echo "📊 Generating dependency report..."
    
    cat > dependency-report.md << EOF
# Dependency Report - $(date)

## Environment Information
- Python: $(uv run python --version)
- UV: $(uv --version)
- Virtual Environment: venv_linux

## Installed Packages
\`\`\`
$(uv pip list)
\`\`\`

## Outdated Packages
\`\`\`
$(uv pip list --outdated)
\`\`\`

## Security Audit
\`\`\`
$(uv run safety check --json 2>/dev/null || uv run safety check)
\`\`\`

## Project Configuration
\`\`\`toml
$(cat pyproject.toml 2>/dev/null || echo "No pyproject.toml found")
\`\`\`
EOF

    echo "✅ Dependency report generated: dependency-report.md"
}
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### Issue: UV command not found
```bash
# Solution: Reinstall UV
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc  # or ~/.zshrc
```

#### Issue: Virtual environment not activated
```bash
# Solution: Activate manually
source venv_linux/bin/activate

# Or use uv run for all commands
uv run python script.py
```

#### Issue: Package installation fails
```bash
# Solution: Clear cache and retry
uv cache clean
uv pip install package_name
```

#### Issue: Dependency conflicts
```bash
# Solution: Use UV resolver
uv sync --resolution=highest
```

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: Python Dependency Management
on: [push, pull_request]

jobs:
  dependencies:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Install UV
      run: curl -LsSf https://astral.sh/uv/install.sh | sh
    
    - name: Setup Virtual Environment
      run: |
        uv venv --name venv_linux
        uv sync
    
    - name: Run Security Audit
      run: |
        uv add --dev safety
        uv run safety check
    
    - name: Validate Dependencies
      run: |
        uv run python -c "import sys; print('Python:', sys.version)"
        uv pip list
```

---

**Remember**: Never install Python packages system-wide. Always use UV with virtual environments for isolation and reproducibility.
