export class Table {
  constructor({ data, element }) {
    this._el = element;
     
    this._render(data);
  } 
    
     _render(data) {
        this._el.innerHTML = `
        <table class="data-table highlight"> 
          <thead>
            <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Rank</th>
                <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${
              data.map(coin => `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol}</td>
                    <td>${coin.rank}</td>
                    <td>${coin.price}</td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
        `;
    }
}
