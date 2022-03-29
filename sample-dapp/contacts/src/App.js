import logo from './logo.svg';
import './App.css';
import { CONTACT_ABI, CONTACT_ADDRESS } from './config';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState();
  const [contactList, setContactList] = useState();
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
	async function load() {
		// set web3 provider. here 'http://127.0.0.1:7545' is for connecting to ganache
		const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
		const accounts = await web3.eth.requestAccounts();
		// get default account. normally it is account with index #: 0
		setAccount(accounts[0]);
		// instantiate smart contract using ABI and address.
		const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
		// set contact list to state variable.
		setContactList(contactList);
		// then we get total number of contacts for iteration
		const counter = await contactList.methods.count().call();
		// iterate through the amount of time of counter
		for(var i=1; i <= counter; i++){
			// call the contacts method to get that particular contact from smart contract
			const contact = await contactList.methods.contacts(i).call();
			// add recently fetched contact to state variable.	  
			setContacts((contacts) => [...contacts, contact]);
		}
    }
    
    load();
    
  }, []);

  // you definitely can customize the design as you wish
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		</header>
        <p>
	Your account is: {account}
        </p>
		<h1>Contacts</h1>
      <ul>
      {
        Object.keys(contacts).map((contact, index) => (
          <li key={`${contacts[index].name}-${index}`}>
            <h4>{contacts[index].name}</h4>
            <span><b>Phone: </b>{contacts[index].phone}</span>
          </li>
        ))
      }
      </ul>
    </div>
  );
}

export default App;
