import BaseComponent from '../BaseComponent/BaseComponent.js';

export class Table extends BaseComponent {
  constructor({ data, element }) {
    super();
    
    this._el = element;
    this._data = data;
         
    this._render(data);

    this._el.addEventListener('click', e => {
      var t = e.target;
      
      if (t.closest('[data-col-type]')) {
        this._sortTable(t.closest('[data-col-type]'));
      } else {
        this._onRowClick(e);
      }
    });
  }

  _onRowClick(e) {
    const target = e.target.closest('tbody tr');
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      let rowClickEvent = new CustomEvent('rowClick', {
        detail: { id },
      });
      this._el.dispatchEvent(rowClickEvent);
    }
  }
    
   _render(data) {
      this._el.innerHTML = `
      <table class="data-table highlight"> 
        <thead>
          <tr>
              <th data-col-name="name" data-col-type="string">Name</th>
              <th data-col-name="symbol" data-col-type="string">Symbol</th>
              <th data-col-name="rank" data-col-type="number">Rank</th>
              <th data-col-name="price" data-col-type="number">Price</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.map(coin => `
              <tr data-id="${coin.id}">
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
  
  _sortTable (col) {
    let sortOrder = '';
    
    if (!col.dataset.sortOrder) {
      sortOrder = 'asc';
    } else {
      sortOrder = col.dataset.sortOrder;
      
      switch (sortOrder) {
        case 'asc': sortOrder = 'desc'; break;
        case 'desc': sortOrder = 'asc'; break;
      }
    }
    
    Array.from(this._el.querySelectorAll('thead th')).forEach(th => {
      
      th.classList.remove('sort-asc', 'sort-desc');  
      if (th !== col) th.removeAttribute('data-sort-order');
    });
    
    col.setAttribute('data-sort-order', sortOrder);
    
    const sortClass = (sortOrder === 'asc') ? 'sort-asc' : 'sort-desc';
    col.classList.add(sortClass);
    
    const colName = col.dataset.colName;
    const type = col.dataset.colType;
    
    const sortedData = this._data.sort((a, b) => {
      let sortResult = null;
      
      switch (type) {
        case 'number': sortResult = +a[colName] - +b[colName]; break;
        case 'string': sortResult = a[colName].localeCompare(b[colName]); break;
      }
      
      return (sortOrder === 'asc') ? sortResult : -sortResult;
    });
    
    const tBody = this._el.querySelector('tbody');
    
    tBody.innerHTML = `
      ${
        sortedData.map(coin => `
          <tr data-id="${coin.id}">
              <td>${coin.name}</td>
              <td>${coin.symbol}</td>
              <td>${coin.rank}</td>
              <td>${coin.price}</td>
          </tr>
        `).join('')
      }
    `;
  }
}
