# Footer Improvement Design Document

## Overview

This design document outlines the improvement of the website footer component to provide better organization, cleaner layout, and improved user experience. The footer will be restructured to remove unnecessary contact information (email and support text) while maintaining essential company information and adding LinkedIn as the primary contact method.

## Architecture

The footer component will maintain its current React-based architecture with the following key improvements:

- **Simplified Contact Section**: Remove email and support text, add LinkedIn company profile
- **Streamlined Social Media**: Show only LinkedIn without "Follow us" text
- **Maintained Legal Section**: Keep existing legal document modals
- **Responsive Layout**: Preserve current responsive grid system
- **Translation Support**: Continue using the existing language context

## Components and Interfaces

### Footer Component Structure

```typescript
interface FooterProps {
  // No props needed - uses language context
}

interface ContactInfo {
  companyName: string;
  address: string;
  linkedinUrl: string;
}

interface SocialMediaLink {
  platform: 'linkedin';
  url: string;
  icon: React.ComponentType;
}
```

### Component Hierarchy

```
Footer
├── CompanyInfoSection
│   ├── Logo + Brand
│   ├── Description
│   └── ContactInfo (Company, Address, LinkedIn)
├── LegalSection
│   ├── Privacy Policy Link
│   ├── Terms of Service Link
│   └── Cookie Policy Link
├── SocialMediaSection
│   └── LinkedIn Link (icon only)
└── CopyrightSection
    └── Copyright Text
```

## Data Models

### Contact Information Model

```typescript
interface CompanyContact {
  name: "Sardes Inc.";
  address: "Maslak, İstanbul, Türkiye";
  linkedin: "https://linkedin.com/company/getsardes";
}
```

### Social Media Model

```typescript
interface SocialMedia {
  linkedin: {
    url: "https://linkedin.com/company/getsardes";
    displayText: "LinkedIn";
    showFollowText: false;
  }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After reviewing all properties identified in the prework, I've identified several areas for consolidation:

- Properties 1.1, 1.2, and 1.5 can be combined into a comprehensive "Company information display" property
- Properties 2.1 and 2.3 can be combined into a single "Legal section structure" property  
- Properties 3.1, 3.2, and 3.5 can be combined into a comprehensive "LinkedIn-only social media" property
- Properties 5.1 and 5.2 can be combined into a single "Copyright content" property

This consolidation eliminates redundancy while maintaining comprehensive validation coverage.

### Correctness Properties

Property 1: Company information display
*For any* footer component render, the component should display company name "Sardes Inc.", address "Maslak, İstanbul, Türkiye", LinkedIn link "https://linkedin.com/company/getsardes", and Sardes logo while excluding email address and support text
**Validates: Requirements 1.1, 1.2, 1.5**

Property 2: Legal section structure  
*For any* footer component render, the legal section should contain a "Legal" heading with privacy policy, terms of service, and cookie policy links grouped underneath
**Validates: Requirements 2.1, 2.3**

Property 3: Legal modal functionality
*For any* legal link click, the corresponding modal should open with content matching the selected language (Turkish or English)
**Validates: Requirements 2.2, 2.5**

Property 4: LinkedIn-only social media
*For any* footer component render, the social media section should display only LinkedIn link with icon and "LinkedIn" text, excluding "Follow us" text and other social media options
**Validates: Requirements 3.1, 3.2, 3.5**

Property 5: LinkedIn link behavior
*For any* LinkedIn link in the footer, clicking it should open "https://linkedin.com/company/getsardes" in a new tab
**Validates: Requirements 3.3**

Property 6: Responsive layout behavior
*For any* screen size, the footer should apply appropriate CSS classes for desktop multi-column or mobile stacked layout
**Validates: Requirements 4.2, 4.3**

Property 7: Copyright content and positioning
*For any* footer component render, the copyright section should display current year, "Sardes Inc. All rights reserved" text, be positioned at the bottom, and include visual separator from other content
**Validates: Requirements 5.1, 5.2, 5.3, 5.5**

Property 8: Language-responsive copyright
*For any* language change, the copyright text should update to match the selected language (Turkish or English)
**Validates: Requirements 5.4**

## Error Handling

### Missing Translation Keys
- Fallback to key name if translation is missing
- Log warning for missing translations in development mode

### Invalid LinkedIn URL
- Validate LinkedIn URL format before rendering
- Provide fallback behavior if URL is malformed

### Modal State Management
- Ensure proper cleanup when modals are closed
- Handle multiple modal open attempts gracefully

### Language Context Errors
- Provide default language (Turkish) if context is unavailable
- Handle language switching errors gracefully

## Testing Strategy

### Unit Testing Approach
The footer component will be tested using React Testing Library with the following focus areas:

- **Rendering Tests**: Verify all required elements are present
- **Content Tests**: Validate correct text content and links
- **Interaction Tests**: Test modal opening and link clicking
- **Language Tests**: Verify content changes with language switching

### Property-Based Testing Approach
Property-based tests will be implemented using fast-check library to verify:

- **Universal Properties**: Properties that should hold across all component states
- **Language Invariants**: Properties that should remain consistent across language changes
- **Responsive Behavior**: Properties that should hold across different viewport sizes

Each property-based test will run a minimum of 100 iterations to ensure comprehensive coverage of the input space. Tests will be tagged with comments referencing their corresponding correctness properties from this design document.

### Test Configuration
- **Framework**: Vitest with React Testing Library
- **Property Testing**: fast-check library
- **Coverage Target**: 90%+ for footer component
- **Test Environment**: jsdom for DOM simulation

### Integration Testing
- Test footer component within full page context
- Verify proper integration with language context
- Test modal functionality in complete application flow