import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Make vi available globally
Object.defineProperty(globalThis, 'vi', { value: vi })