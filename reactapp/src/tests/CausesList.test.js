import React from 'react';
import { render, screen } from '@testing-library/react';
import CausesList from '../components/CausesList';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('CausesList', () => {
  beforeEach(() => {
    api.getActiveCauses.mockReset();
    api.getNGOs.mockReset();
  });
  it('State_shows loading, loads and displays causes', async () => {
    api.getActiveCauses.mockResolvedValue([{id:1,title:'C1',currentAmount:10,targetAmount:100,ngoId:4,startDate:'2024-01-01',endDate:'2024-12-31'},{id:2,title:'C2',currentAmount:5,targetAmount:50,ngoId:5,startDate:'2024-02-01',endDate:'2024-11-30'}]);
    api.getNGOs.mockResolvedValue([{id:4,name:'Green Org'},{id:5,name:'Water Org'}]);
    render(<CausesList />);
    expect(screen.getByTestId('cause-loading')).toBeInTheDocument();
    expect(await screen.findByText('C1')).toBeInTheDocument();
    expect(screen.getByText('Green Org')).toBeInTheDocument();
    expect(screen.queryByTestId('cause-error')).not.toBeInTheDocument();
    expect(screen.getAllByText('Donate')[0]).toBeInTheDocument();
  });
  it('State_shows empty state', async () => {
    api.getActiveCauses.mockResolvedValue([]);
    api.getNGOs.mockResolvedValue([]);
    render(<CausesList />);
    expect(await screen.findByTestId('cause-empty')).toBeInTheDocument();
  });
  it('State_shows error if api fails', async () => {
    api.getActiveCauses.mockRejectedValue(new Error('api fail'));
    api.getNGOs.mockResolvedValue([]);
    render(<CausesList />);
    expect(await screen.findByTestId('cause-error')).toBeInTheDocument();
  });
});
