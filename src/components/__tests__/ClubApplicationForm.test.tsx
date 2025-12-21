import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ClubApplicationForm from '../ClubApplicationForm';

// Mock the supabase module
vi.mock('@/lib/supabase', () => ({
  submitClubApplication: vi.fn()
}));

describe('ClubApplicationForm', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<ClubApplicationForm onClose={mockOnClose} />);
    
    expect(screen.getByLabelText(/kulüp adı/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/üniversite/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/üye sayısı/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-posta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kullanım amacı/i)).toBeInTheDocument();
  });

  it('shows validation error for empty required fields', async () => {
    render(<ClubApplicationForm onClose={mockOnClose} />);
    
    const submitButton = screen.getByRole('button', { name: /başvuru gönder/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/kulüp adı gereklidir/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<ClubApplicationForm onClose={mockOnClose} />);
    
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/kulüp adı/i), {
      target: { value: 'Test Kulübü' }
    });
    fireEvent.change(screen.getByLabelText(/üniversite/i), {
      target: { value: 'Test Üniversitesi' }
    });
    fireEvent.change(screen.getByLabelText(/e-posta/i), {
      target: { value: 'invalid-email' }
    });
    
    const submitButton = screen.getByRole('button', { name: /başvuru gönder/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/geçerli bir e-posta adresi girin/i)).toBeInTheDocument();
    });
  });

  it('closes modal when close button is clicked', () => {
    render(<ClubApplicationForm onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: '' }); // X button
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});