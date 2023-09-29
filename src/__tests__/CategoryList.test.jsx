import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe,it,expect,beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import CategoryList from '../components/CategoryList/CategoryList';
import moviesData from '../movies.json';

describe('CategoryList', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <CategoryList />
            </MemoryRouter>
        );
    });
//test 1
    it('renders without errors', () => {
        const selectElement = screen.getByRole('combobox', { options: { hidden: true } }); // Use 'listbox' for <select>
        expect(selectElement).toBeInTheDocument();
    });
// test 2
    it('displays default option', () => {
        const defaultOption = screen.getByText(/category/i);
        expect(defaultOption).toBeInTheDocument();
    });
//test 3
    it('displays all genres', () => {
        const genres = moviesData.reduce((acc, movie) => {
            const genresForMovie = movie.genre.split(',').map(g => g.trim());
            return [...new Set([...acc, ...genresForMovie])];
        }, []);
        genres.forEach(genre => {
            const option = screen.getByText(new RegExp(genre, 'i'));
            expect(option).toBeInTheDocument();
        });
    });
// test 4
    it('navigates to correct URL on change', () => {
        const selectElement = screen.getByRole('combobox');
        const testGenre = moviesData[0].genre.split(',')[0].trim();
        userEvent.selectOptions(selectElement, [testGenre]);
        
    });
});


