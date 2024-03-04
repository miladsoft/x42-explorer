import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { CoinService } from 'app/core/coin/coin.service';
import { ApiService } from 'app/services/api.service';
import { SetupService } from 'app/services/setup.service';
import { environment } from '../../src/environments/environment';
@Injectable({
    providedIn: 'root'
})



export class InitialDataResolver 
{
    /**
     * Constructor
     */
    constructor(
        private _navigationService: NavigationService,
        private _coinService: CoinService,
        private setup: SetupService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let explorerChain = this.setup.current;
        const wasInitilized = this.setup.initialized;

        // If not initialized yet, perform some operations:
        if (!this.setup.initialized) {
              this.setup.multiChain = true;
              this.setup.apiChain = 'BLOCKCORE';


           if (this.setup.multiChain) {
               this.setup.getChains(explorerChain);
           }

           // If local is set to true, then we'll default to single chain and also not run normal initialization where the API is queried.
           if (environment.local) {
              this.setup.multiChain = false;
              this.setup.initialized = true;
              explorerChain = 'local'; // Used in the URLs, so make sure it is lowercase.
           }

           this.setup.initialized = true;
        }

        // TODO: Figure out a better way to get path fragments pre-parsed into an array.
        const fragments = state.url.split('/');
        const chain = fragments[1];
        // Fork join multiple API endpoint calls to wait all of them to finish
        if (chain !== '') {
            return forkJoin([

                this._navigationService.get(),
                this._coinService.get(),
                this.setup.setChain(chain),
            ]);
         } else {
            // We should reset to multichain configuration if user navigate back to home.
            // If already initilized and no chain in URL; we'll reset back to root.
            if (wasInitilized) {
                return forkJoin([

                    this._navigationService.get(),
                    this._coinService.get(),
                    this.setup.setChain(this.setup.apiChain),
                ]);
            } else {
                return forkJoin([

                    this._navigationService.get(),
                    this._coinService.get(),
                    this.setup.setChain(explorerChain),
                ]);
            }
         }
    }


}
