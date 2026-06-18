---
description: Initialize new agent with project context and rules understanding
auto_execution_mode: 3
---

# Agent Initialization Workflow

## 🎯 Purpose
This workflow MUST be executed when a new AI agent starts working on this project. It ensures the agent understands the project structure, rules, and current state before beginning any work.

## 🚀 Initialization Steps

### 1. Load GSD Context (Anti-Context-Rot)
**MANDATORY — ALWAYS FIRST**: Read the `.planning/` directory to restore session context:

**Read in this exact order**:
1. `.planning/STATE.md` — Where we left off last session (most critical)
2. `.planning/PROJECT.md` — Project overview, tech stack, patterns
3. `.planning/ROADMAP.md` — Current phase and progress
4. `.planning/REQUIREMENTS.md` — What's in scope

Then read project-level files:
5. `TASK.md` (if exists) — Current task tracker
6. `README.md` (if exists) — Project overview and setup

**If `.planning/` doesn't exist**: Run `/gsd-new-project` to initialize it.

### 2. Understand Project Rules Structure
**Read all rule files to understand constraints and guidelines**:

```bash
# General rules
read_file .windsurf/rules/general/general_rules.md

# Project-specific rules
read_file .windsurf/rules/project_rules/project_rules.md

# Workspace-specific rules (read relevant ones based on project type)
read_file .windsurf/rules/workspace_rules/nextjs_rules.md
```

### 3. Understand Available Workflows
**Read existing workflows to understand available automation**:

```bash
# List all available workflows
find .windsurf/workflows -name "*.md" | sort

# Read key workflows
read_file .windsurf/workflows/github_api.md
```

### 4. Project Structure Assessment
**Understand the current project layout**:

```bash
# Get project overview
list_dir .

# Check for common project files
find . -maxdepth 2 -type f \( -name "*.json" -o -name "*.yaml" -o -name "*.yml" -o -name "*.toml" -o -name "*.cfg" -o -name "*.ini" \) | sort
```

### 5. Git Repository Status
**Check repository state**:

```bash
# Check if git is initialized
git status 2>/dev/null || echo "Git not initialized"

# If git exists, check current state
if git status >/dev/null 2>&1; then
    git branch -a
    git log --oneline -5
    git status --porcelain
fi
```

## 📋 Initialization Checklist

### ✅ Required Actions
- [ ] **Read PLANNING.md** (if exists) - Understand project architecture and goals
- [ ] **Read TASK.md** (if exists) - Understand current tasks and milestones  
- [ ] **Read README.md** (if exists) - Understand project overview
- [ ] **Read general rules** - `general_rules.md` and `ask_user_questions.md`
- [ ] **Read project rules** - `project_rules.md`
- [ ] **Read relevant workspace rules** - Based on project type (Python, Dart/Flutter, etc.)
- [ ] **Review available workflows** - Understand existing automation
- [ ] **Assess project structure** - Understand current file organization
- [ ] **Check git status** - Understand repository state

### 🧠 Context Understanding
After completing the initialization, the agent should be able to answer:

1. **What is this project's purpose and architecture?**
2. **What are the current active tasks and priorities?**
3. **What rules and constraints must be followed?**
4. **What workflows and automation are available?**
5. **What is the current project structure and state?**

## 🔄 Continuous Context Updates

### During Work Session
- **Check TASK.md** before starting new tasks
- **Update TASK.md** when completing or discovering new tasks
- **Follow all rules** in the rules directory
- **Use available workflows** when applicable
- **Maintain project structure** as defined in PLANNING.md

### End of Work Session
- **Commit changes** with descriptive messages
- **Update TASK.md** with completed items
- **Document any new discoveries** in appropriate files
- **Ensure project structure remains clean**

## 🚨 Critical Rules

### NEVER Skip These Steps
1. **Always read PLANNING.md first** (if it exists)
2. **Always check TASK.md before starting work** (if it exists)
3. **Always follow all rules** in the rules directory
4. **Always use available workflows** instead of manual processes
5. **Always maintain clean project structure**

### ALWAYS Do These Things
1. **Ask questions** if rules are unclear (see `ask_user_questions.md`)
2. **Update documentation** when making changes
3. **Use proper git practices** (commits, branches, etc.)
4. **Follow coding standards** defined in workspace rules
5. **Test changes** before considering them complete

## 📚 Quick Reference

### Key Files to Remember
- `.windsurf/rules/general/general_rules.md` - Core project rules
- `.windsurf/rules/project_rules/project_rules.md` - Project-specific guidelines
- `.windsurf/rules/workspace_rules/` - Language/framework specific rules
- `.windsurf/workflows/` - Available automation workflows

### Common Commands
```bash
# Find planning/task files
find . -name "PLANNING.md" -o -name "TASK.md" -o -name "README.md"

# List workflows
find .windsurf/workflows -name "*.md"

# Check project structure
list_dir .

# Git status
git status
```

---

**Remember**: This initialization is MANDATORY for all new agents. Never start work without completing these steps first.
