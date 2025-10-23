import './App.css';
import Greeting from './components/Greeting';
import { List } from './components/List';
import ExpensiveCalculation from './components/useMemo/ExpensiveCalculation';

function App() {
  return (
    <>
      <Greeting name={'Claudia'} age={32} />
      <List
        items={[
          { id: 1, name: 'Ana' },
          { id: 2, name: 'Luis' },
        ]}
        renderItem={({ name }) => <strong>{name}</strong>}
      />
      <div className='card'>
        <ExpensiveCalculation />
      </div>
    </>
  );
}

export default App;
