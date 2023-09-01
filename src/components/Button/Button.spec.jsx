import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'

describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
        render(<Button text="Load more" />);

        //Garante que a acerção ocorreu, mais comum em testes assincronos
        expect.assertions(1);

        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        //cria uma função. Essa função tem um contador próprio de quantas vezes foi chamada
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);
        const button = screen.getByRole('button', {name: /load more/i});

        //Faz o click no botão
        fireEvent.click(button);
        userEvent.click(button); //evento natural 

        expect(fn).toHaveBeenCalledTimes(2);

    });

    it('should disabled when disabled is true', () => {
        render(<Button text="Load more" disabled={true} />);
        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeDisabled();
    });

    it('should enabled when disabled is false', () => {
        render(<Button text="Load more" disabled={false} />);
        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeEnabled();
    });
});

//----- Rodar os testes -----
// No terminal:
// npm test: Roda os testes escritos
// npm test -- --coverage: Roda testes pré estabelecidos para todo o código

// Link User Event: https://github.com/testing-library/user-event