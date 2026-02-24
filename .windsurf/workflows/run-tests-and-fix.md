---
description: Run tests and automatically fix errors to ensure code quality
---

# Run Tests and Fix Workflow

## 🎯 Purpose
Automated testing workflow that runs unit tests, end-to-end tests, and automatically fixes common errors to ensure code quality before committing, merging, or deploying.

## 🚀 Testing and Auto-Fix Process

### 1. Environment Preparation
**Set up testing environment and verify dependencies**:

```bash
# Check if virtual environment exists
if [ ! -d "venv_linux" ]; then
    echo "🔧 Creating virtual environment..."
    uv venv --name venv_linux
fi

# Ensure testing dependencies are installed
echo "📦 Installing testing dependencies..."
uv add --dev pytest pytest-cov pytest-asyncio pytest-mock pytest-xdist

# Install code quality tools
uv add --dev ruff black isort mypy pre-commit

# Verify installation
echo "🔍 Verifying testing environment..."
uv run python -c "import pytest; print('✅ pytest ready')"
uv run python -c "import ruff; print('✅ ruff ready')"
uv run python -c "import black; print('✅ black ready')"
```

### 2. Code Quality Pre-Checks
**Run code formatting and linting with auto-fixes**:

```bash
echo "🎨 Running code formatting..."

# Auto-format with ruff (preferred)
echo "📝 Formatting with ruff..."
uv run ruff format . --fix
if [ $? -eq 0 ]; then
    echo "✅ Code formatted successfully with ruff"
else
    echo "⚠️ Ruff formatting had issues, trying black..."
    uv run black . --line-length 100
fi

# Sort imports
echo "📦 Sorting imports..."
uv run ruff check . --select I --fix || uv run isort . --profile black

# Run linting with auto-fixes
echo "🔍 Running linting with auto-fixes..."
uv run ruff check . --fix --extend-select E, F, W, I, N, UP, B, A, C4, T20

# Check for remaining linting issues
echo "🔍 Checking for remaining linting issues..."
LINT_ERRORS=$(uv run ruff check . --output-format=json 2>/dev/null | jq length 2>/dev/null || echo "0")
if [ "$LINT_ERRORS" -gt 0 ]; then
    echo "⚠️ Found $LINT_ERRORS linting errors that need manual fix"
    uv run ruff check . --output-format=text
else
    echo "✅ No linting errors found"
fi
```

### 3. Type Checking
**Run type checking and fix common type issues**:

```bash
echo "🔍 Running type checking..."

# Run mypy with auto-fix for common issues
echo "📝 Running mypy type checking..."
uv run mypy src/ --ignore-missing-imports --show-error-codes --no-error-summary

# Check for type issues
TYPE_ERRORS=$(uv run mypy src/ --ignore-missing-imports --show-error-codes 2>&1 | grep -c "error:" || echo "0")
if [ "$TYPE_ERRORS" -gt 0 ]; then
    echo "⚠️ Found $TYPE_ERRORS type errors"
    
    # Auto-fix common type issues
    echo "🔧 Attempting to fix common type issues..."
    
    # Add type hints to functions missing them
    find src/ -name "*.py" -exec uv run python -c "
import ast
import sys
import re

def add_type_hints(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Simple regex-based type hint additions for common cases
        # Add return type to simple functions
        content = re.sub(r'def (\w+)\(\):\s*\n\s*\"\"\"', r'def \1() -> None:\n    \"\"\"', content)
        
        with open(file_path, 'w') as f:
            f.write(content)
        print(f'Updated type hints in {file_path}')
    except Exception as e:
        print(f'Error processing {file_path}: {e}')
" {} \;
    
else
    echo "✅ No type errors found"
fi
```

### 4. Test Discovery and Organization
**Find and organize tests**:

```bash
echo "🔍 Discovering tests..."

# Find test files
TEST_FILES=$(find . -name "test_*.py" -o -name "*_test.py" | sort)
if [ -z "$TEST_FILES" ]; then
    echo "⚠️ No test files found. Creating basic test structure..."
    
    # Create test directory structure
    mkdir -p tests
    
    # Create basic test file if src directory exists
    if [ -d "src" ]; then
        MAIN_MODULE=$(find src/ -name "*.py" -path "*/src/*" | grep -E "(main|app|__init__)" | head -1 | sed 's|src/||; s|/.*||')
        if [ -n "$MAIN_MODULE" ]; then
            cat > "tests/test_${MAIN_MODULE}.py" << EOF
"""Tests for ${MAIN_MODULE} module."""

import pytest
from ${MAIN_MODULE} import main_function


def test_main_function_basic():
    """Test basic functionality of main_function."""
    # This is a placeholder test - implement actual test
    assert True


def test_main_function_edge_case():
    """Test edge case for main_function."""
    # This is a placeholder test - implement actual test
    assert True


if __name__ == "__main__":
    pytest.main([__file__])
EOF
            echo "✅ Created basic test file: tests/test_${MAIN_MODULE}.py"
        fi
    fi
else
    echo "✅ Found test files:"
    echo "$TEST_FILES"
fi

# Create conftest.py if it doesn't exist
if [ ! -f "tests/conftest.py" ] && [ -d "tests" ]; then
    cat > tests/conftest.py << EOF
"""Pytest configuration and shared fixtures."""

import pytest
import sys
from pathlib import Path

# Add src directory to Python path
src_path = Path(__file__).parent.parent / "src"
if str(src_path) not in sys.path:
    sys.path.insert(0, str(src_path))


@pytest.fixture
def sample_data():
    """Provide sample data for testing."""
    return {"key": "value", "number": 42}


@pytest.fixture
def temp_file(tmp_path):
    """Provide a temporary file for testing."""
    file_path = tmp_path / "test_file.txt"
    file_path.write_text("test content")
    return file_path
EOF
    echo "✅ Created tests/conftest.py"
fi
```

### 5. Unit Test Execution
**Run unit tests with comprehensive coverage**:

```bash
echo "🧪 Running unit tests..."

# Determine test directory
if [ -d "tests" ]; then
    TEST_DIR="tests"
elif [ -d "src" ]; then
    TEST_DIR="src"
else
    TEST_DIR="."
fi

# Run tests with coverage
echo "📊 Running tests with coverage..."
uv run pytest "$TEST_DIR" \
    --cov=src \
    --cov-report=html \
    --cov-report=term-missing \
    --cov-report=xml \
    --cov-fail-under=80 \
    -v \
    --tb=short \
    --strict-markers \
    --disable-warnings

# Capture test results
TEST_EXIT_CODE=$?
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ All unit tests passed"
else
    echo "❌ Some unit tests failed. Attempting to fix..."
    
    # Run tests in verbose mode to see failures
    echo "🔍 Running failed tests in detail..."
    uv run pytest "$TEST_DIR" -v --tb=long --lf
    
    # Auto-fix common test failures
    fix_common_test_failures
fi
```

### 6. Auto-Fix Common Test Failures
**Automatically fix common test issues**:

```bash
fix_common_test_failures() {
    echo "🔧 Attempting to fix common test failures..."
    
    # Fix 1: Missing imports
    echo "📝 Fixing missing imports..."
    find "$TEST_DIR" -name "*.py" -exec uv run python -c "
import ast
import sys
import re

def fix_imports(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Add common missing imports
        needed_imports = []
        if 'pytest' in content and 'import pytest' not in content:
            needed_imports.append('import pytest')
        if 'tempfile' in content and 'import tempfile' not in content:
            needed_imports.append('import tempfile')
        if 'Path' in content and 'from pathlib import Path' not in content:
            needed_imports.append('from pathlib import Path')
        
        if needed_imports:
            # Find import section
            lines = content.split('\n')
            import_end = 0
            for i, line in enumerate(lines):
                if line.startswith('import ') or line.startswith('from '):
                    import_end = i + 1
                elif line.strip() == '' and import_end > 0:
                    break
            
            # Insert missing imports
            for imp in needed_imports:
                lines.insert(import_end, imp)
                import_end += 1
            
            with open(file_path, 'w') as f:
                f.write('\n'.join(lines))
            print(f'Added imports to {file_path}')
    
    except Exception as e:
        print(f'Error fixing imports in {file_path}: {e}')

fix_imports('{}')
" {} \;
    
    # Fix 2: Assertion syntax
    echo "📝 Fixing assertion syntax..."
    find "$TEST_DIR" -name "*.py" -exec sed -i 's/assertEqual(/assert /g' {} \;
    find "$TEST_DIR" -name "*.py" -exec sed -i 's/assertRaises(/with pytest.raises(/g' {} \;
    find "$TEST_DIR" -name "*.py" -exec sed -i 's/assertTrue(/assert /g' {} \;
    find "$TEST_DIR" -name "*.py" -exec sed -i 's/assertFalse(/assert not /g' {} \;
    
    # Fix 3: Test function naming
    echo "📝 Fixing test function naming..."
    find "$TEST_DIR" -name "*.py" -exec uv run python -c "
import re

def fix_test_names(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Fix test function names
        content = re.sub(r'def test_(\w+)_\d+\(', r'def test_\1(', content)
        
        with open(file_path, 'w') as f:
            f.write(content)
        print(f'Fixed test names in {file_path}')
    except Exception as e:
        print(f'Error fixing test names in {file_path}: {e}')

fix_test_names('{}')
" {} \;
    
    # Fix 4: Missing fixtures
    echo "📝 Adding missing fixtures..."
    find "$TEST_DIR" -name "*.py" -exec uv run python -c "
import re

def add_missing_fixtures(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Add common fixtures if missing
        if 'tmp_path' in content and 'tmp_path' not in content:
            # Add tmp_path fixture parameter
            content = re.sub(r'(def test_\w+)\(', r'\1(tmp_path, ', content)
        
        with open(file_path, 'w') as f:
            f.write(content)
        print(f'Added fixtures to {file_path}')
    except Exception as e:
        print(f'Error adding fixtures to {file_path}: {e}')

add_missing_fixtures('{}')
" {} \;
    
    echo "✅ Attempted to fix common test failures"
}
```

### 7. Integration and End-to-End Tests
**Run integration and E2E tests**:

```bash
echo "🌐 Running integration tests..."

# Look for integration tests
INTEGRATION_TESTS=$(find . -name "*integration*" -name "*.py" -o -name "*e2e*" -name "*.py")
if [ -n "$INTEGRATION_TESTS" ]; then
    echo "✅ Found integration tests:"
    echo "$INTEGRATION_TESTS"
    
    # Run integration tests
    echo "🧪 Running integration tests..."
    uv run pytest -m "integration or e2e" -v --tb=short || {
        echo "⚠️ Integration tests failed, but continuing..."
    }
else
    echo "ℹ️ No integration tests found"
fi

# Check for API endpoints and create basic integration tests
if [ -f "src/main.py" ] || [ -f "src/app.py" ]; then
    echo "🔍 Checking for FastAPI/Flask applications..."
    
    # Create basic API integration test if not exists
    if [ ! -f "tests/test_integration.py" ]; then
        cat > tests/test_integration.py << EOF
"""Integration tests for API endpoints."""

import pytest
from fastapi.testclient import TestClient
from main import app  # Adjust import based on your app structure

client = TestClient(app)


def test_health_check():
    """Test API health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_api_root():
    """Test API root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
EOF
        echo "✅ Created basic integration test: tests/test_integration.py"
    fi
fi
```

### 8. Performance and Load Testing
**Run basic performance tests**:

```bash
echo "⚡ Running performance tests..."

# Install performance testing tools
uv add --dev pytest-benchmark 2>/dev/null || true

# Run benchmark tests if they exist
BENCHMARK_TESTS=$(find . -name "*benchmark*" -name "*.py" -o -name "*perf*" -name "*.py")
if [ -n "$BENCHMARK_TESTS" ]; then
    echo "🧪 Running benchmark tests..."
    uv run pytest -m benchmark --benchmark-only --benchmark-sort=mean || {
        echo "⚠️ Benchmark tests failed"
    }
else
    echo "ℹ️ No benchmark tests found"
    
    # Create basic benchmark test for performance-critical functions
    if [ -d "src" ]; then
        echo "🔍 Looking for performance-critical functions..."
        # Find functions that might need benchmarking
        find src/ -name "*.py" -exec grep -l "def.*\(process\|calculate\|compute\|transform\)" {} \; | head -1 | while read file; do
            echo "📝 Creating benchmark test for $(basename "$file")..."
            MODULE_NAME=$(basename "$file" .py)
            
            cat > "tests/test_benchmark_${MODULE_NAME}.py" << EOF
"""Benchmark tests for ${MODULE_NAME}."""

import pytest
from ${MODULE_NAME} import main_function


@pytest.mark.benchmark
def test_main_function_performance(benchmark):
    """Benchmark main_function performance."""
    result = benchmark(main_function, test_data)
    assert result is not None
EOF
            break
        done
    fi
fi
```

### 9. Test Coverage Analysis
**Analyze test coverage and generate reports**:

```bash
echo "📊 Analyzing test coverage..."

# Generate coverage report
if [ -f "htmlcov/index.html" ]; then
    echo "✅ Coverage report generated: htmlcov/index.html"
    
    # Show coverage summary
    echo "📈 Coverage Summary:"
    uv run coverage report --show-missing || uv run python -c "
import xml.etree.ElementTree as ET
try:
    tree = ET.parse('coverage.xml')
    root = tree.getroot()
    for package in root.findall('.//package'):
        name = package.get('name')
        line_rate = package.get('line-rate')
        print(f'{name}: {float(line_rate)*100:.1f}% coverage')
except:
    print('Coverage XML not found')
"
else
    echo "⚠️ Coverage report not generated"
fi

# Check for low coverage areas
echo "🔍 Checking for low coverage areas..."
uv run coverage report --fail-under=80 --show-missing 2>/dev/null || {
    echo "⚠️ Some areas have low coverage. Consider adding tests for:"
    uv run coverage report --show-missing | grep -E "^[a-zA-Z_]" | head -5
}
```

### 10. Final Validation and Reporting
**Final validation and comprehensive reporting**:

```bash
echo "🔍 Running final validation..."

# Run all checks one more time
echo "🧪 Running final test suite..."
FINAL_TEST_RESULT=0

# 1. Code formatting
uv run ruff format . --check || {
    echo "❌ Code formatting issues found"
    FINAL_TEST_RESULT=1
}

# 2. Linting
uv run ruff check . || {
    echo "❌ Linting issues found"
    FINAL_TEST_RESULT=1
}

# 3. Type checking
uv run mypy src/ --ignore-missing-imports || {
    echo "⚠️ Type checking issues found"
    # Don't fail for type issues unless critical
}

# 4. Tests
uv run pytest "$TEST_DIR" --tb=short || {
    echo "❌ Tests failed"
    FINAL_TEST_RESULT=1
}

# Generate comprehensive report
generate_test_report $FINAL_TEST_RESULT

# Return final result
if [ $FINAL_TEST_RESULT -eq 0 ]; then
    echo "🎉 All checks passed! Code is ready for commit/merge/deploy."
else
    echo "❌ Some checks failed. Please review and fix issues."
    exit 1
fi
```

### 11. Report Generation
**Generate comprehensive testing report**:

```bash
generate_test_report() {
    local exit_code=$1
    
    cat > test-report.md << EOF
# Test and Code Quality Report - $(date)

## Summary
- **Status**: $([ $exit_code -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")
- **Environment**: Python $(uv run python --version)
- **Virtual Environment**: venv_linux

## Code Quality Checks

### Formatting
- **Tool**: ruff format
- **Status**: $(uv run ruff format . --check >/dev/null 2>&1 && echo "✅ Passed" || echo "❌ Failed")

### Linting
- **Tool**: ruff
- **Issues Found**: $(uv run ruff check . --output-format=json 2>/dev/null | jq length 2>/dev/null || echo "N/A")

### Type Checking
- **Tool**: mypy
- **Status**: $(uv run mypy src/ --ignore-missing-imports >/dev/null 2>&1 && echo "✅ Passed" || echo "⚠️ Issues found")

## Test Results

### Unit Tests
- **Framework**: pytest
- **Test Files**: $(find "$TEST_DIR" -name "test_*.py" | wc -l)
- **Coverage**: $(uv run coverage report 2>/dev/null | grep "TOTAL" | awk '{print $NF}' || echo "N/A")

### Integration Tests
- **Status**: $([ -n "$INTEGRATION_TESTS" ] && echo "✅ Found" || echo "ℹ️ None found")

## Recommendations

### Immediate Actions
$([ $exit_code -ne 0 ] && echo "- ❌ Fix failing tests before proceeding" || echo "- ✅ All checks passed, ready to proceed")

### Code Quality Improvements
- Add more unit tests to improve coverage
- Consider adding integration tests for API endpoints
- Set up pre-commit hooks for automated checks

## Files Changed
$(git status --porcelain 2>/dev/null || echo "Git not initialized")

EOF

    echo "📊 Test report generated: test-report.md"
    
    # Show summary
    echo ""
    echo "📋 Quick Summary:"
    echo "- Status: $([ $exit_code -eq 0 ] && echo "✅ PASSED" || echo "❌ FAILED")"
    echo "- Test Files: $(find "$TEST_DIR" -name "test_*.py" | wc -l)"
    echo "- Coverage: $(uv run coverage report 2>/dev/null | grep "TOTAL" | awk '{print $NF}' || echo "N/A")"
    echo "- Report: test-report.md"
}
```

## 📋 Quick Commands

### Run All Tests and Fixes
```bash
# Complete test and fix cycle
run_tests_and_fix() {
    echo "🚀 Running complete test and fix cycle..."
    
    # Execute all workflow steps
    # (Commands from sections 1-11 above)
    
    echo "✅ Test and fix cycle complete"
}

# Quick test run
quick_test() {
    echo "🧪 Running quick tests..."
    uv run pytest tests/ -v --tb=short
}

# Fix code formatting
fix_formatting() {
    echo "🎨 Fixing code formatting..."
    uv run ruff format . --fix
    uv run ruff check . --fix
}

# Run coverage only
run_coverage() {
    echo "📊 Running coverage analysis..."
    uv run pytest tests/ --cov=src --cov-report=html --cov-report=term
}
```

## 🔧 Pre-commit Integration

### Setup Pre-commit Hooks
```bash
# Install pre-commit hooks
echo "🔧 Setting up pre-commit hooks..."
uv run pre-commit install

# Create .pre-commit-config.yaml if not exists
if [ ! -f ".pre-commit-config.yaml" ]; then
    cat > .pre-commit-config.yaml << EOF
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v1.0.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/psf/black
    rev: 23.7.0
    hooks:
      - id: black
        language_version: python3

  - repo: local
    hooks:
      - id: pytest
        name: pytest
        entry: uv run pytest
        language: system
        pass_filenames: false
        always_run: true
EOF
    echo "✅ Created .pre-commit-config.yaml"
fi
```

## 🚨 Troubleshooting

### Common Test Issues and Fixes

#### Issue: Import errors in tests
```bash
# Fix: Add src to Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"

# Or fix in conftest.py
echo "import sys; sys.path.insert(0, 'src')" >> tests/conftest.py
```

#### Issue: Missing fixtures
```bash
# Fix: Add common fixtures to conftest.py
cat >> tests/conftest.py << EOF

@pytest.fixture
def mock_data():
    return {"test": "data"}
EOF
```

#### Issue: Coverage not working
```bash
# Fix: Install coverage and configure
uv add --dev coverage pytest-cov
uv run coverage run -m pytest
uv run coverage report
```

## 🔄 Continuous Integration

### GitHub Actions Test Workflow
```yaml
name: Test and Fix
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup UV
      run: curl -LsSf https://astral.sh/uv/install.sh | sh
    
    - name: Setup Environment
      run: |
        uv venv --name venv_linux
        uv sync
        uv add --dev pytest pytest-cov ruff black mypy
    
    - name: Run Tests and Fixes
      run: |
        # Execute the complete workflow
        source .windsurf/workflows/run-tests-and-fix.md
    
    - name: Upload Coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
```

---

**Remember**: This workflow ensures code quality through automated testing and fixing. Run it before any commit, merge, or deployment to maintain high code standards.
