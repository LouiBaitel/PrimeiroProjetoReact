import './styles.css';

export const TextInput = ({actionFn, inputValue}) => {
    return (
        <input 
          className='text-input'
          onChange={inputValue} 
          value={actionFn} 
          type='search'
          placeholder='Type to search'
        />
    )
}