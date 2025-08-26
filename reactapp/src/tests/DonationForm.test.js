import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DonationForm from '../components/DonationForm';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('DonationForm', () => {
  beforeEach(() => jest.clearAllMocks());
  it('ErrorHandling_validates fields', async () => {
    render(<DonationForm causeId={1} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText(/Enter a positive amount/)).toBeInTheDocument();
  });
  it('State_shows error and then success for API donation', async () => {
    api.submitDonation.mockRejectedValueOnce({ response: { data: { message: 'Invalid' } } });
    render(<DonationForm causeId={8} />);
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Donor Name/i), { target: { value: 'Abe' } });
    fireEvent.change(screen.getByLabelText(/Donor Email/i), { target: { value: 'a@b.com' } });
    fireEvent.click(screen.getByText('Submit'));
    await screen.findByTestId('donation-error');
    api.submitDonation.mockResolvedValueOnce({});
    fireEvent.click(screen.getByText('Submit'));
    await screen.findByTestId('donation-success');
  });
});
