
# Code Review Template

## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Performance improvement
- [ ] Code refactoring
- [ ] Documentation update

## TypeScript Compliance Checklist
- [ ] All new code uses proper TypeScript types
- [ ] No `any` types used (or justified with comments)
- [ ] Interfaces prefixed with `I`
- [ ] Return types explicitly defined for functions
- [ ] Proper error handling with typed catch blocks
- [ ] Type imports used where appropriate

## ESLint Compliance Checklist
- [ ] ESLint passes without errors or warnings
- [ ] Import statements properly organized
- [ ] No magic numbers (constants used instead)
- [ ] Function complexity under 10
- [ ] No unused variables or imports
- [ ] Proper naming conventions followed

## Code Quality Checklist
- [ ] Code is self-documenting with clear variable/function names
- [ ] Functions are small and focused (single responsibility)
- [ ] DRY principle followed (no code duplication)
- [ ] SOLID principles applied
- [ ] Error handling is comprehensive
- [ ] Performance implications considered

## Architecture Checklist
- [ ] Changes follow the established layered architecture
- [ ] Services properly abstracted
- [ ] Hooks used for state management where appropriate
- [ ] Components are properly modularized
- [ ] Types are properly organized and exported

## Testing Checklist
- [ ] Unit tests added/updated for new functionality
- [ ] Integration tests updated if needed
- [ ] All tests pass
- [ ] Code coverage maintained or improved
- [ ] Edge cases covered

## Performance Checklist
- [ ] No unnecessary re-renders in React components
- [ ] Proper memoization used where needed
- [ ] Bundle size impact considered
- [ ] API calls optimized (caching, batching)
- [ ] Memory leaks prevented

## Security Checklist
- [ ] Input validation implemented
- [ ] No sensitive data exposed in client-side code
- [ ] Proper authentication/authorization checks
- [ ] XSS prevention measures in place
- [ ] CSRF protection maintained

## Accessibility Checklist
- [ ] Keyboard navigation works properly
- [ ] Screen reader compatibility maintained
- [ ] Color contrast meets WCAG guidelines
- [ ] Semantic HTML used
- [ ] ARIA labels added where necessary

## Browser Compatibility
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Mobile responsiveness verified

## Documentation
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Code comments added for complex logic
- [ ] Development guidelines followed

## Deployment Checklist
- [ ] Environment variables properly configured
- [ ] Database migrations included if needed
- [ ] Build process works correctly
- [ ] No breaking changes to existing APIs

## Additional Notes
Any additional context, screenshots, or special instructions for reviewers.

## Reviewer Instructions
1. Pull the branch and test locally
2. Verify all checklist items
3. Check for any potential issues not covered by automated tools
4. Provide constructive feedback
5. Approve only when all standards are met

---

**Remember**: Code quality is non-negotiable. Every item in this checklist should be verified before approval.
