import { Table } from '../Table/Table.js';
import DataService from '../../services/DataService.js';

export class App {
  constructor({ element }) {
    this._el = element;
     
    this._render();

    this._data = DataService.getCurrencies();
    this._initTable(this._data);

  } 

  _initTable(data) {
    this._table = new Table({
      data,
      element: document.querySelector('[data-element="table"]'),
    })
  }
    
     _render() {
        this._el.innerHTML = `
            <div class="row">
                <div class="col s12">
                    <h1>Tiny Crypto Market</h1>
                </div>
            </div>
            <div class="row">
              <div data-element="table" class="col s12"></div>
            </div>
        `;
    }
}
