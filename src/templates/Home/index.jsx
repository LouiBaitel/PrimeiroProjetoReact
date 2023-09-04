import './style.css';
import { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


//---------------- Exemplo de componente de classes stateless----------------

export const Home = () => {

    // state = { 
    //   posts: [],
    //   allPosts: [],
    //   page: 0,
    //   postsPerPage: 10,
    //   searchValue: '',
    // };

    const [ posts, setPosts ] = useState([]);
    const [ allPosts, setAllPosts ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ postsPerPage ] = useState(10);
    const [ searchValue, setSearchValue ] = useState('');
    
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post =>{
      return post.title.toLowerCase().includes(
            searchValue.toLowerCase()
          )
    }) : posts;


    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
      const postsAndPhotos = await loadPosts();
      
      setPosts(postsAndPhotos.slice(page, postsPerPage));
      setAllPosts(postsAndPhotos);
    }, []);
    

      useEffect(() => {
        handleLoadPosts(0, postsPerPage);
      }, [handleLoadPosts, page, postsPerPage]);
  

    const loadMorePosts = () => {
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

      posts.push(...nextPosts);

      setPosts(posts);
      setPage(nextPage);
      
    }

    const handleChange = (event) => {
      const {value} = event.target;
      setSearchValue(value);
    };



    return (
        <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
              <h1> Search value: {searchValue}</h1>
          )}
          <TextInput
            searchValue={searchValue}
            handleChange={handleChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts = { filteredPosts } />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts... </p>
        )}
        
        <div className='button-container'>
          {!searchValue && (
            <Button
              text="Load more posts..."
              onClick={loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
        
      </section>
    )
  }

// export class Home2 extends Component {

//   state = { 
//     //counter: 0,
//     // posts: [
//     //   {
//     //     id: 1,
//     //     title: 'Este é o título 1',
//     //     body: 'Este é o body 1'
//     //   },
//     //   {
//     //     id: 2,
//     //     title: 'Este é o título 2',
//     //     body: 'Este é o body 2'
//     //   },
//     //   {
//     //     id: 3,
//     //     title: 'Este é o título 3',
//     //     body: 'Este é o body 3'
//     //   },
//     // ]

//     //Posts sera preenchido com uma API
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: '',
//   };

//   //timeOutUpdate = null;


//   async componentDidMount() {
//     //this.handleTimeOut();
//      await this.loadPosts();
    
    
//   };

//   loadPosts = async () => {

//     const {page, postsPerPage} = this.state;

//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

//     posts.push(...nextPosts);

//     this.setState({posts, page: nextPage});
    
//   }

//   // componentDidUpdate(){
//   //   //this.handleTimeOut();
//   // };

//   // componentWillUnmount(){
//   //   //clearTimeout(this.timeOutUpdate);
//   // }

//   // handleTimeOut = () => { 
//   //   const { posts, counter } = this.state;
//   //   posts[0].title = 'O titulo mudou';
    
//   //   this.timeOutUpdate = setTimeout(() => {
//   //     this.setState({posts, counter: counter + 1});
//   //   }, 5000);
//   // };


//   //O constructor deve receber o props SEMPRE.
//   // constructor(props) {
//   //   //O super chama o que tem dentro da class 
//   //   super(props);

//   //   //--------- função de bind? ----------
//   //   // A função bind() cria uma nova função vinculada. Chamar a função vinculada geralmente resulta na execução da função que ela envolve, que também é chamada de função de destino. A função vinculada armazenará os parâmetros passados ​​— que incluem o valor deste e os primeiros argumentos — como seu estado interno.
//   //   // ------- função de bind no React ----------
//   //   // O bind() é um método embutido no React que é usado para passar os dados como um argumento para a função de um componente baseado em classe.
//   //   //this.handlePClick = this.handlePClick.bind(this);

//   //   // Definindo o state 
//   //   // this.state = {
//   //   //   name: 'Carolino Mascarpone',
//   //   //   counter: 0
//   //   // };
//   // }

//   // handlePClick() {
//   //   // const { name } = this.state;
//   //   // console.log(` A tag <p> foi clicada para o ${name}! \n Este é um exemplo de evento sintético. `);

//   //   //------- Mudar o estado -------------
//   //   // Sempre que houver alguma alteração no estado, a função render é chamada novamente
//   //   this.setState({ name: 'Carolino Madaleno'});
//   // }

//   // //Utilizando a arrow function não é necessário fazer o bind da função dentro do constructor
//   // handleAClick = (event) => {
//   //   // Cancela a ação anterior do evento e faz apenas o que foi definido
//   //   event.preventDefault();

//   //   const { counter } = this.state;
//   //   const nextCounter = counter + 1;
//   //   this.setState({ counter: nextCounter});
//   // }

//   handleChange = (event) => {
//     const {value} = event.target;
//     this.setState({ searchValue: value});
//   };

//   render() {

//     // Chamando o que foi definido no state e armazenando dentro de uma constante. Para chamar essa variável dentro de alguma das tags de JSX é necessário utilizar {} 
//     //const name = this.state.name;

//     //---- Pode ser feito através da atribuição via desestruturação do javascript (MAIS UTILIZADO) ----
//     //const { name, counter } = this.state;

//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue ? allPosts.filter(post =>{
//       return post.title.toLowerCase().includes(
//             searchValue.toLowerCase()
//           )
//     }) : posts;

//     //Quando utilizar o método .map é necessário incluir uma primary key, neste caso foi utilizado o id.
//     // os !! convertem qualquer valor para um tipo booleano
//     return (
//       <section className='container'>
//         <div className='search-container'>
//           {!!searchValue && (
//               <h1> Search value: {searchValue}</h1>
//           )}
//           <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts = { filteredPosts } />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não existem posts... </p>
//         )}
        
//         <div className='button-container'>
//           {!searchValue && (
//             <Button
//               text="Load more posts..."
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
        
//       </section>
      
//     );
//   }
// }

// Conteúdo do que havia dentro da div app
/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <p onClick={ this.handlePClick }>
            Uma coisinha qualquer para o {name} com um contador de {counter}.
          </p>
          <a
            onClick={this.handleAClick }
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Esse é o link
          </a>
      </header>  */

//---------------- Exemplo de componente de função stateless----------------
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }



//----- LifeCycle Method -------
//Link: https://www.w3schools.com/react/react_lifecycle.asp#

//----- Operadores de short-circuit ------
//Link: https://ericholiveira.medium.com/short-circuit-operators-como-escrever-um-código-mais-conciso-e-expressivo-8bb2d877484f

//----- Operador Condicional Ternário -----
//Link: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_operator

//----- Manipulação de eventos ------
//Link: https://pt-br.legacy.reactjs.org/docs/handling-events.html

//----- SyntheticEvent -------
//Link: https://pt-br.legacy.reactjs.org/docs/events.html

//----- Mock Service Worker ------
//Link: https://mswjs.io/docs/getting-started/install