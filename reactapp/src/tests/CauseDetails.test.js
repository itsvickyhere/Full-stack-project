import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CauseDetails from '../components/CauseDetails';
import * as api from '../utils/api';

jest.mock('../utils/api');

const mockCause = { id: 7, title: 'Edu Cause', description: 'desc', targetAmount: 1000, currentAmount: 900, ngoId: 30, isActive: true, startDate: '2024-04-01', endDate: '2024-12-31' };
const mockDonations = [
  { id: 1, amount: 50, donorName: 'A', donorEmail: 'a@email.com', message: 'msg', isAnonymous: false, donationDate: '2024-06-01T10:30:00', causeId: 7 },
  { id: 2, amount: 90, message: '', isAnonymous: true, donationDate: '2024-06-02T12:00:00', causeId: 7 }
];

describe('CauseDetails', () => {
  beforeEach(() => {
    api.getCauseById.mockReset();
    api.getDonationsByCause.mockReset();
  });

  it('State_renders and loads donation info and anonymization', async () => {
    api.getCauseById.mockResolvedValue(mockCause);
    api.getDonationsByCause.mockResolvedValue(mockDonations);
    render(<MemoryRouter initialEntries={['/causes/7']}>
        <Routes><Route path="/causes/:id" element={<CauseDetails />} /></Routes>
      </MemoryRouter>);
    await screen.findByText(/Edu Cause/);
    expect(screen.getByText(/Current.*900/)).toBeInTheDocument();
    expect(screen.getAllByText(/Anonymous/)[0]).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('State_shows error on cause loading failure', async () => {
    api.getCauseById.mockRejectedValue(new Error('fail'));
    api.getDonationsByCause.mockRejectedValue(new Error('fail'));
    render(<MemoryRouter initialEntries={['/causes/6']}>
      <Routes><Route path="/causes/:id" element={<CauseDetails />} /></Routes>
    </MemoryRouter>);
    await screen.findByText(/failed to load cause/i);
  });
});
