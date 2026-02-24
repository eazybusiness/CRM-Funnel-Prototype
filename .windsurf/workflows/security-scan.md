---
description: Comprehensive security vulnerability scanning for multi-language codebases
---

# Security Scan Workflow

## 🎯 Purpose
Automated security vulnerability scanning for codebases supporting Python, JavaScript, TypeScript, Java, Go, and other common languages. This workflow identifies security issues, dependencies vulnerabilities, and code quality problems.

## 🚀 Security Scan Process

### 1. Project Language Detection
**Identify project languages and frameworks**:

```bash
# Detect primary languages
find . -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.java" -o -name "*.go" -o -name "*.rb" -o -name "*.php" -o -name "*.cs" | head -10

# Check for dependency files
find . -maxdepth 3 \( -name "requirements.txt" -o -name "package.json" -o -name "Pipfile" -o -name "poetry.lock" -o -name "yarn.lock" -o -name "pom.xml" -o -name "build.gradle" -o -name "go.mod" -o -name "Gemfile" -o -name "composer.json" \) | sort
```

### 2. Python Security Scans
**Run Python-specific security tools**:

```bash
# Safety - Check for known security vulnerabilities in dependencies
if [ -f "requirements.txt" ]; then
    echo "🔍 Running Safety scan on requirements.txt..."
    safety check -r requirements.txt --json --output safety-report.json || true
    safety check -r requirements.txt || true
fi

# Bandit - Find common security issues in Python code
if [ -d "." ] && [ "$(find . -name '*.py' | wc -l)" -gt 0 ]; then
    echo "🔍 Running Bandit scan on Python code..."
    bandit -r . -f json -o bandit-report.json || true
    bandit -r . || true
fi

# Semgrep - Static analysis for security vulnerabilities
if command -v semgrep >/dev/null 2>&1; then
    echo "🔍 Running Semgrep scan..."
    semgrep --config=auto --json --output=semgrep-report.json . || true
    semgrep --config=auto . || true
fi
```

### 3. JavaScript/TypeScript Security Scans
**Run Node.js-specific security tools**:

```bash
# npm audit - Check for vulnerable dependencies
if [ -f "package.json" ]; then
    echo "🔍 Running npm audit..."
    npm audit --json > npm-audit-report.json 2>/dev/null || npm audit || true
    
    # yarn audit if yarn.lock exists
    if [ -f "yarn.lock" ]; then
        echo "🔍 Running yarn audit..."
        yarn audit --json > yarn-audit-report.json 2>/dev/null || yarn audit || true
    fi
fi

# ESLint security plugin
if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || grep -q "eslintConfig" package.json 2>/dev/null; then
    echo "🔍 Running ESLint security rules..."
    npx eslint . --ext .js,.jsx,.ts,.tsx --format=json --output-file=eslint-security-report.json --config '{"extends": ["plugin:security/recommended"]}' || true
fi
```

### 4. Container Security Scans
**Scan Docker containers and images**:

```bash
# Dockerfile security check
if [ -f "Dockerfile" ]; then
    echo "🔍 Running Dockerfile security check..."
    docker run --rm -v "$PWD:/root/.cache/" aquasec/trivy:latest config --exit-code 0 Dockerfile || true
fi

# Trivy - Container image vulnerability scanner
if command -v docker >/dev/null 2>&1 && command -v trivy >/dev/null 2>&1; then
    echo "🔍 Running Trivy filesystem scan..."
    trivy fs --format json --output trivy-fs-report.json . || true
    trivy fs . || true
fi
```

### 5. Secret Detection
**Scan for exposed secrets and credentials**:

```bash
# GitLeaks - Scan for secrets in git history
if command -v gitleaks >/dev/null 2>&1; then
    echo "🔍 Running GitLeaks scan..."
    gitleaks detect --source . --report-path gitleaks-report.json --report-format json || true
    gitleaks detect --source . || true
fi

# TruffleHog - Scan for secrets
if command -v trufflehog >/dev/null 2>&1; then
    echo "🔍 Running TruffleHog scan..."
    trufflehog filesystem . --json --output=trufflehog-report.json || true
    trufflehog filesystem . || true
fi
```

### 6. Infrastructure as Code Security
**Scan Terraform, CloudFormation, etc.**:

```bash
# Checkov - IaC security scanning
if command -v checkov >/dev/null 2>&1; then
    echo "🔍 Running Checkov scan..."
    find . -name "*.tf" -o -name "*.yml" -o -name "*.yaml" | head -5 | while read file; do
        checkov --file "$file" --output json --output-file-path checkov-report.json || true
        checkov --file "$file" || true
    done
fi
```

### 7. Dependency License Compliance
**Check for problematic licenses**:

```bash
# Python license check
if command -v pip-licenses >/dev/null 2>&1 && [ -f "requirements.txt" ]; then
    echo "🔍 Checking Python licenses..."
    pip-licenses --format=json --output-file=python-licenses.json || true
fi

# Node.js license check
if [ -f "package.json" ]; then
    echo "🔍 Checking Node.js licenses..."
    npx license-checker --json --outputFile=node-licenses.json || true
    npx license-checker || true
fi
```

## 📊 Report Generation

### Consolidated Security Report
```bash
# Generate summary report
echo "# Security Scan Report - $(date)" > security-scan-summary.md
echo "" >> security-scan-summary.md

# Add tool results
if [ -f "safety-report.json" ]; then
    echo "## Python Dependency Vulnerabilities (Safety)" >> security-scan-summary.md
    cat safety-report.json | jq -r '.vulnerabilities[] | "- \(.package): \(.vulnerability) (Severity: \(.analyzed_version))"' 2>/dev/null || echo "No vulnerabilities found" >> security-scan-summary.md
    echo "" >> security-scan-summary.md
fi

if [ -f "bandit-report.json" ]; then
    echo "## Python Code Security Issues (Bandit)" >> security-scan-summary.md
    cat bandit-report.json | jq -r '.results[] | "- \(.test_name): \(.issue_text) (Severity: \(.issue_severity))"' 2>/dev/null || echo "No issues found" >> security-scan-summary.md
    echo "" >> security-scan-summary.md
fi

if [ -f "npm-audit-report.json" ]; then
    echo "## Node.js Dependency Vulnerabilities (npm audit)" >> security-scan-summary.md
    cat npm-audit-report.json | jq -r '.vulnerabilities[]? | "- \(.name): \(.severity) - \(.url)"' 2>/dev/null || echo "No vulnerabilities found" >> security-scan-summary.md
    echo "" >> security-scan-summary.md
fi

echo "## Scan Summary" >> security-scan-summary.md
echo "- Scan completed: $(date)" >> security-scan-summary.md
echo "- Project root: $(pwd)" >> security-scan-summary.md
echo "- Languages detected: $(find . -name '*.py' -o -name '*.js' -o -name '*.ts' | sort -u | sed 's/.*\.//' | sort | uniq -c | sort -nr | awk '{print $2 " (" $1 " files)"}' | tr '\n' ', ' | sed 's/,$//')" >> security-scan-summary.md
```

## 🛠️ Tool Installation

### Python Security Tools
```bash
# Install Python security tools
pip install safety bandit semgrep pip-licenses

# Install TruffleHog
pip install trufflehog
```

### Node.js Security Tools
```bash
# Install Node.js security tools
npm install -g eslint-plugin-security
npm install -g license-checker
```

### Container and General Tools
```bash
# Install Trivy (container scanning)
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Install GitLeaks
curl -L https://github.com/gitleaks/gitleaks/releases/latest/download/gitleaks-linux-amd64 -o gitleaks && chmod +x gitleaks && sudo mv gitleaks /usr/local/bin/

# Install Checkov (IaC scanning)
pip install checkov

# Install jq for JSON processing
sudo apt-get install jq  # Debian/Ubuntu
# brew install jq  # macOS
```

## 📋 Security Scan Checklist

### ✅ Pre-Scan Requirements
- [ ] **Install required tools** based on project languages
- [ ] **Check for API keys/tokens** needed for commercial tools
- [ ] **Ensure git history is available** for secret scanning
- [ ] **Verify network access** for vulnerability database updates

### 🔍 Scan Execution
- [ ] **Language detection** - Identify all project languages
- [ ] **Dependency scanning** - Check all package managers
- [ ] **Code analysis** - Run static analysis tools
- [ ] **Secret detection** - Scan for exposed credentials
- [ ] **Container scanning** - Check Dockerfiles and images
- [ ] **IaC scanning** - Validate infrastructure code
- [ ] **License compliance** - Check dependency licenses

### 📊 Post-Scan Actions
- [ ] **Review all reports** for critical vulnerabilities
- [ ] **Prioritize fixes** by severity (Critical > High > Medium > Low)
- [ ] **Update dependencies** to secure versions
- [ ] **Fix code issues** identified by static analysis
- [ ] **Rotate exposed secrets** if any found
- [ ] **Document exceptions** for false positives

## 🚨 Severity Classification

### Critical (Fix Immediately)
- Remote code execution vulnerabilities
- Hardcoded credentials or API keys
- SQL injection vulnerabilities
- Authentication bypasses

### High (Fix Within 24-48 hours)
- Cross-site scripting (XSS)
- Insecure deserialization
- Broken authentication
- Sensitive data exposure

### Medium (Fix Within 1 Week)
- Security misconfigurations
- Outdated dependencies with known CVEs
- Insecure cryptographic storage
- Insufficient logging/monitoring

### Low (Fix in Next Sprint)
- Information disclosure
- Insecure direct object references
- Missing security headers
- Code quality issues

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: Security Scan
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Run Security Scan
      run: |
        # Install tools
        pip install safety bandit semgrep
        npm install -g eslint-plugin-security
        
        # Execute security workflow
        # (Commands from above sections)
```

### GitLab CI Example
```yaml
security-scan:
  stage: test
  script:
    - pip install safety bandit semgrep
    - npm install -g eslint-plugin-security
    - # Execute security workflow commands
  artifacts:
    reports:
      security: security-scan-summary.md
```

## 📚 Additional Resources

### Security Tools Documentation
- **Safety**: https://pyup.io/safety/
- **Bandit**: https://bandit.readthedocs.io/
- **Semgrep**: https://semgrep.dev/
- **Trivy**: https://github.com/aquasecurity/trivy
- **GitLeaks**: https://github.com/gitleaks/gitleaks
- **Checkov**: https://www.checkov.io/

### Best Practices
- **Run scans regularly** - At least weekly, preferably on every commit
- **Fix critical issues immediately** - Don't let security debt accumulate
- **Keep tools updated** - Security tools evolve rapidly
- **Review false positives** - Tune rules to reduce noise
- **Document exceptions** - Maintain a security exceptions register

---

**Remember**: Security scanning is not a one-time activity. Integrate it into your CI/CD pipeline and development workflow for continuous security monitoring.
