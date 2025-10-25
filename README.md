# Project Navigator: An AI-Powered Framework for Academic and Career Pathway Optimization in Higher Education

---
<div align="center">
  <img width="60%" alt="Siraj Islamic Chatbot" src="https://github.com/RaneemSadeh/Contributing-to-Project-Navigator/blob/main/ezgif-4c20e661323617.gif" />
  <br/><br/>
  Made with ❤️ from Raneem Sadeh
</div>

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background or identity. We expect all participants to:

- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Git
- PostgreSQL 15+
- Redis 7.0+
- Familiarity with machine learning and education technology

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/project-navigator.git
   cd project-navigator
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/raneemyahya/project-navigator.git
   ```

3. **Create development environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements-dev.txt
   ```

4. **Install pre-commit hooks**
   ```bash
   pre-commit install
   ```

5. **Set up test database**
   ```bash
   createdb project_navigator_test
   python manage.py init-test-db
   ```

## Development Workflow

### Branch Naming Convention

Use descriptive branch names following this pattern:

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions or modifications

Example:
```bash
git checkout -b feature/add-lstm-grade-predictor
```

### Making Changes

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clear, documented code
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add LSTM-based grade predictor"
   ```

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(spm): add LSTM architecture for grade prediction

Implemented LSTM-based neural network that captures temporal
dependencies in student performance data. Achieves 95% accuracy
on validation set.

Closes #123
```

## Coding Standards

### Python Style Guide

We follow [PEP 8](https://pep8.org/) with some modifications:

- Line length: 100 characters
- Use type hints for all function signatures
- Use docstrings for all public functions and classes

### Code Formatting

We use the following tools (automatically run via pre-commit):

- **Black**: Code formatting
- **isort**: Import sorting
- **flake8**: Style checking
- **mypy**: Type checking

```bash
# Format code
black src/

# Sort imports
isort src/

# Check style
flake8 src/

# Type checking
mypy src/
```

### Documentation Strings

Use Google-style docstrings:

```python
def predict_grade(student_id: str, course_id: str, semester: str) -> float:
    """Predicts the grade a student will receive in a course.
    
    Args:
        student_id: Unique identifier for the student
        course_id: Unique identifier for the course
        semester: Target semester (e.g., "Fall 2025")
        
    Returns:
        Predicted grade as a float between 0.0 and 4.0
        
    Raises:
        ValueError: If student_id or course_id is invalid
        ModelNotTrainedError: If the prediction model hasn't been trained
        
    Example:
        >>> grade = predict_grade("12345", "CS401", "Fall 2025")
        >>> print(f"Predicted grade: {grade:.2f}")
        Predicted grade: 3.45
    """
    # Implementation
```

### Type Hints

Always use type hints for function parameters and return values:

```python
from typing import List, Dict, Optional, Union

def get_recommendations(
    student_id: str,
    num_recommendations: int = 10,
    filters: Optional[Dict[str, any]] = None
) -> List[CourseRecommendation]:
    """Get course recommendations for a student."""
    pass
```

## Testing Requirements

### Test Coverage

- All new features must include tests
- Maintain minimum 80% code coverage
- Critical modules (SPM, CFSM, PFM) require 90%+ coverage

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=project_navigator --cov-report=html

# Run specific test file
pytest tests/test_spm.py

# Run tests matching a pattern
pytest -k "test_grade_prediction"

# Run only fast tests (exclude slow integration tests)
pytest -m "not slow"
```

### Writing Tests

#### Unit Tests

```python
import pytest
from project_navigator.modules import StudentPerformanceModel

class TestStudentPerformanceModel:
    """Test suite for Student Performance Model."""
    
    @pytest.fixture
    def spm(self):
        """Create SPM instance for testing."""
        config = Config(...)
        return StudentPerformanceModel(config)
    
    def test_grade_prediction_accuracy(self, spm, sample_data):
        """Test that grade predictions meet accuracy threshold."""
        predictions = spm.predict(sample_data['students'], sample_data['courses'])
        accuracy = calculate_accuracy(predictions, sample_data['actual_grades'])
        assert accuracy >= 0.90, f"Accuracy {accuracy} below threshold"
    
    def test_handles_missing_data(self, spm):
        """Test that model handles missing data gracefully."""
        incomplete_data = {'student_id': '123', 'gpa': None}
        result = spm.predict_single(incomplete_data, 'CS401')
        assert result is not None
        assert 0.0 <= result <= 4.0
```

#### Integration Tests

```python
@pytest.mark.slow
@pytest.mark.integration
class TestEndToEndWorkflow:
    """Integration tests for complete workflows."""
    
    def test_complete_recommendation_workflow(self, navigator, test_student):
        """Test complete workflow from data to recommendations."""
        # Load data
        navigator.load_student_data(test_student)
        
        # Generate recommendations
        recommendations = navigator.recommend_courses(
            student_id=test_student['id'],
            semester='Fall 2025'
        )
        
        # Verify recommendations
        assert len(recommendations) > 0
        assert all(r.score > 0 for r in recommendations)
        assert all(r.prerequisites_met for r in recommendations)
```

#### Fixtures

Create reusable fixtures in `tests/conftest.py`:

```python
import pytest
from project_navigator import ProjectNavigator

@pytest.fixture
def sample_student_data():
    """Provide sample student data for testing."""
    return {
        'student_id': 'TEST001',
        'major': 'Computer Science',
        'gpa': 3.45,
        'completed_courses': ['CS101', 'CS102', 'MATH101']
    }

@pytest.fixture
def mock_database(monkeypatch):
    """Mock database connections for testing."""
    # Implementation
    pass
```

## Documentation

### Code Documentation

- All public APIs must be documented
- Use clear, concise language
- Include usage examples
- Document edge cases and limitations

### README Updates

Update the main README.md when:
- Adding new features
- Changing APIs
- Updating dependencies
- Modifying installation steps

### API Documentation

Update API documentation in `docs/api/` when adding or modifying endpoints.

### Architecture Documentation

Update architecture diagrams when making structural changes. Use tools like:
- draw.io for system architecture
- PlantUML for sequence diagrams
- Mermaid for flowcharts

## Pull Request Process

### Before Submitting

**Checklist:**
- [ ] Code follows style guidelines
- [ ] All tests pass locally
- [ ] New tests added for new functionality
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] Branch is up-to-date with main
- [ ] No merge conflicts

### Submitting a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request on GitHub**
   - Provide a clear title and description
   - Reference related issues
   - Describe the changes made
   - Include screenshots if applicable
   - Add test results if relevant

3. **Pull Request Template**

```markdown
## Description
Brief description of changes made.

## Related Issues
Closes #123
Related to #456

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe the testing performed:
- Unit tests added/modified
- Integration tests added/modified
- Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass locally
- [ ] No new warnings generated

## Screenshots (if applicable)
[Add screenshots here]

## Additional Notes
Any additional context or information.
```

### Review Process

1. **Automated Checks**
   - CI/CD pipeline runs automatically
   - All tests must pass
   - Code coverage must meet threshold
   - Linting must pass

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Make requested changes

3. **Merge**
   - Maintainer will merge when approved
   - Branch will be deleted automatically

### After Merge

- Pull latest main branch
- Delete your local feature branch
  ```bash
  git checkout main
  git pull upstream main
  git branch -d feature/your-feature-name
  ```

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g., Ubuntu 22.04]
 - Python version: [e.g., 3.10.5]
 - Project Navigator version: [e.g., 1.2.0]

**Additional context**
Any other relevant information.

**Logs**
```
Paste relevant logs here
```
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots.

**Implementation ideas**
If you have ideas about how to implement this feature.
```

## Development Guidelines

### Module Development

When adding a new module:

1. Create module in `src/project_navigator/modules/`
2. Add configuration schema in `config/schemas/`
3. Write comprehensive tests
4. Update documentation
5. Add usage examples
6. Update architecture diagrams

### Adding New Dependencies

1. Add to `requirements.txt` or `requirements-dev.txt`
2. Update documentation
3. Ensure compatibility with existing dependencies
4. Run `pip-compile` to update lock file
5. Document why dependency is needed

### Performance Optimization

When optimizing performance:

1. Profile the code first
2. Focus on bottlenecks
3. Add performance benchmarks
4. Document performance improvements
5. Ensure optimizations don't reduce readability

### Database Migrations

When modifying database schema:

1. Create migration file
   ```bash
   python manage.py create-migration "description"
   ```

2. Test migration on test database
3. Document breaking changes
4. Provide rollback instructions
5. Update data models documentation

## Community

### Communication Channels

- **GitHub Discussions**: General questions and discussions
- **GitHub Issues**: Bug reports and feature requests
- **Email**: For private/sensitive matters

### Getting Help

- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions
- Contact maintainers if needed

### Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Annual acknowledgments

## License

By contributing to Project Navigator, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Project Navigator!
