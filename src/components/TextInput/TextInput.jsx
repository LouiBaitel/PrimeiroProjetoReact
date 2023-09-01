import { render, screen } from '@testing-library/react';
import { TextInput } from '.'
import userEvent from '@testing-library/user-event'


describe('<TextInput />', () => {
    it('should have a value of searchValue', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testing'}/>);

        const input = screen.getAllByPlaceholderText(/type your search/i);
        expect(input.value).toBe('testando');

    });

    it('should call handleChange function on each key presses', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn}/>);

        const input = screen.getAllByPlaceholderText(/type your search/i);
        const value = 'The value';
        
        userEvent.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });  
    
    it('should match snapshot', () => {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn}/>);
        expect(container).toMatchSnapshot();
    });  
});