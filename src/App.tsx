import './App.css';
import { useState } from "react";

function App() {
  const [reviewer, setReviewer] = useState(null);
  const [login, setLogin] = useState("NewNadym");
  const [repo, setRepo] = useState("NewNadym.github.io");
  const [blackList, setBlackList] = useState("NewNadym");
  const [contributors, setContributors] = useState("");

  function findReviewer() {
    if (login && repo) {
      fetch(`https://api.github.com/repos/${login}/${repo}/contributors`)
        .then((response) => response.json())
        .then((data) => {
          let c = ""
          data.forEach(function(item:any) {
            c = c + ' ' + item.login
          });
          setContributors(c)
          if (!data && data.length > 0) {
            setReviewer(null);
            return;
          }
          const filtered = data
            .filter((item:any) => !blackList
              .split(',').map((blackItem:any) => blackItem.trim())
              .includes(item.login)
            )
          if (filtered && filtered.length > 0) {
            const randomIndex = Math.floor(Math.random() * filtered.length);
            setReviewer(filtered[randomIndex]);
          } else {
            setReviewer(null);
          }
        })
        .then((response) => {
          localStorage.setItem('login', JSON.stringify(login));
          localStorage.setItem('repo', JSON.stringify(repo));
          localStorage.setItem('blackList', JSON.stringify(blackList));
        })
        .catch((error) => console.error(error));
    } else{
      alert("Не заполнены необходимые поля ()")
    }
  }

  function User(props:any) {
    if (props.user) {
      return (
        <div>
          <img height="200px" src={props.user.avatar_url} alt="" />
          <div>{props.user.login}</div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React. Найти ревьюера</h1>

        <h3>Настройки</h3>
        <input className='custom_input'
                placeholder='login' 
                name="login" 
                value={login}
                onChange={(e) => setLogin(e.target.value)}/>

        <input className='custom_input'
                placeholder='repo' 
                name="repo" 
                value={repo} 
                onChange={(e) => setRepo(e.target.value)}/>

        <input className='custom_input'
                placeholder='blackList' 
                name="blackList" 
                value={blackList} 
                onChange={(e) => setBlackList(e.target.value)}/>

        <button className="btn" onClick={findReviewer}>Найти проверяющего</button>
        
        <h3>Результаты поиска</h3>
        <User label={"Проверяющий"} user={reviewer}/>

        <h3>Контрибьютеры репозитория</h3>
        <p className='contributors'>{contributors}</p>
      </header>
    </div>
  );
}

export default App;
