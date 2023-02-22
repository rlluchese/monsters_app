import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list-component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchTerm: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((users) => this.setState(() => {
        return { monsters: users }
      }),
      () => {
        console.log('Did mount');
      });
  }

  onSearchChange = (event) => {
    this.setState(() => {
      return { searchTerm: event.target.value.toLocaleLowerCase() }
    });
  };

  render() {
    const { monsters, searchTerm } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchTerm);
    });

    return (
      <div>
        <h1 className='app-title'>Monsters App</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters'/>
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
