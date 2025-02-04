/* eslint-disable use-isnan */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { SetupService } from 'app/services/setup.service';
import { Router, ActivatedRoute, NavigationEnd, ResolveEnd } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  // @HostBinding('class.content-centered') hostClass = true;

  searchTerm: any;
  scheme = JSON.parse(localStorage.getItem('config')).scheme;

  constructor(
    private api: ApiService,
    public setup: SetupService,
    private router: Router,
    private _snackBar: MatSnackBar,) {

  }
  ngOnDestroy(): void {

  }

  async ngOnInit() {

  }

  inputType(value: string) {
    if (value.startsWith(this.setup.Network.NetworkWitnessPrefix)) {
        return 'address';
    } else if (value.length < 20) { // LONG_MAX: 9223372036854775807
        return 'index';
    } else if (value.length > 30 && value.length < 54) {
        return 'address';
    } else {
        return 'hash';
    }
}


async search() {
    const text = this.searchTerm;

    const inputType = this.inputType(text);

    switch (inputType) {
        case 'index': {
            // tslint:disable-next-line: radix
            const index = parseInt(text, 10);

            if (!isNaN(index) && index > 0) {
                this.router.navigate([this.setup.current, 'explorer', 'block', index]);
            }
            else {
                this._snackBar.open('Explorer cannot detect your data type', 'retry', { duration: 3000, panelClass: [this.scheme] });
            }

            break;
        }
        case 'address': {
            this.router.navigate([this.setup.current, 'explorer', 'address', text]);
            break;
        }
        case 'hash': {
            // Search first for block then if not found, search for transaction.
            let block = null;

            // TODO: An important todo is to put the search results from here into state-management!
            //       That way, we will avoid loading the transaction/block twice when searching.

            try {
                block = await this.api.getBlockByHash(text);
            } catch (err) {
                // We could check if this is actually an 404 or some other error. Should we?
            }

            if (block) {
                this.router.navigate([this.setup.current, 'explorer', 'block', block.blockHash]);
            } else {
                const transaction = await this.api.getTransaction(text);
                this.router.navigate([this.setup.current, 'explorer', 'transaction', transaction.transactionId]);
            }

            break;
        }
        default:
            {
                this._snackBar.open('Explorer cannot detect your data type', 'retry', { duration: 3000, panelClass: [this.scheme] });
            }
    }
}
}
