---
trigger: always_on
---

Use markdown files to manage the project (README.md, `.planning/*`, TASK.md).
Keep files under 500 lines. Split into modules when needed.
Test early, test often. Every new function should have unit tests.
Write docs and comments as you go. Don’t delay documentation.



Project Awareness & Context
Always read `.planning/STATE.md` and `.planning/PROJECT.md` at the start of a new conversation to understand the project’s goals, style, constraints, and current status.
Check TASK.md before starting a new task. If the task isn’t listed, add it with a brief description and today’s date.
Use consistent naming conventions, directory structure, and architecture patterns as described in `.planning/PROJECT.md`.
Code Structure & Modularity
Limit file length to a manageable size (e.g., no longer than 500 lines of code). If a file approaches this limit, refactor by splitting it into modules or helper files.
Organize code into clearly defined modules, grouped by feature or responsibility.
Use clear and consistent imports or requires (favor relative imports within packages).
Testing & Reliability
Create unit tests for new functionalities (e.g., functions, classes, endpoints).
Check and update existing tests after modifying any logic to keep them relevant.
Tests should live in a /tests directory that mirrors the main application structure. Include:
At least one test for expected behavior.
One edge case test.
One failure case test.
Task Completion
Mark completed tasks in TASK.md immediately after you finish them.
Add any new subtasks or TODOs discovered during development to TASK.md under a “Discovered During Work” section.
Style & Conventions
Define a primary programming language and adhere to its best practices.
Follow relevant style guides (e.g., AirBnB for JavaScript, PSR-12 for PHP), use appropriate linting tools, and format code consistently.
Use established frameworks or libraries where applicable, ensuring they align with project goals.
Write docstrings or comments for every function using a consistent format to enhance understandability.
Documentation & Explainability
Update README.md when new features are added, dependencies change, or setup steps are modified.
Comment on complex or non-obvious code, ensuring clarity for developers at various levels of expertise.
When implementing complex logic, add inline comments that explain the reasoning, not just the implementation.
AI Behavior Rules
Never assume missing context; ask questions if uncertain.
Avoid referencing libraries or functions that aren’t commonly accepted or verified.
Always confirm file paths and module names exist before using them in code or tests.
Never delete or overwrite existing code unless explicitly instructed or if it’s part of a task from TASK.md.




When working with python, refer to @python_rules.md
When building a flutter project, refer to @dart_flutter_rules.md


when processing very long commands, please check the command status every 5 minutes, not every 60 seconds, to save tokens. If possbile run other pending tasks in the meantime.

Check @project_rules.md for project-specific rules and instructions
Check /examples for example and best performers, if applicable


Make sure to take advantage of your skillsets in @skills folder.