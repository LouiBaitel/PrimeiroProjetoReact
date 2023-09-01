import { render, screen } from '@testing-library/react'
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', ()=>{
    it('should render PosCard correctly', ()=>{
        //Renderiza o componente que está sendo testado
        //const {debug} = render(<PostCard {...props} />);
        //debug();

        render(<PostCard {...props} />);

        expect(screen.getByRole('img', {name: /title one/i}))
            .toBeInTheDocument('src', 'img/img.png');

        expect(screen.getByRole('heading', {name: /title one/i})).toBeInTheDocument();

        expect(screen.getByText('body one')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const {container} = render(<PostCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});