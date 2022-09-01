import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';



// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [


    // Redirect empty path to '/blockcore'
    { path: '', pathMatch: 'full', redirectTo: 'x42' },
    { path: 'x42', pathMatch: 'full', redirectTo: 'x42' },
    { path: ':chain', pathMatch: 'full', redirectTo: ':chain/explorer' },
    { path: ':chain/blockcore', pathMatch: 'full', redirectTo: 'blockcore' },


    // home routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: 'x42', loadChildren: () => import('app/modules/explorer/explorer.module').then(m => m.ExplorerModule) },
        ]
    },
    // ticker routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/ticker', loadChildren: () => import('app/modules/ticker/ticker.module').then(m => m.TickerModule) },
        ]
    },
    // explorer routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer', loadChildren: () => import('app/modules/explorer/explorer.module').then(m => m.ExplorerModule) },
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/blocks', loadChildren: () => import('app/modules/explorer/blocks/blocks.module').then(m => m.BlocksModule) },
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/block/:block', loadChildren: () => import('app/modules/explorer/block/block.module').then(m => m.BlockModule) },
        ]
    },


    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/transaction/:transaction', loadChildren: () => import('app/modules/explorer/transaction/transaction.module').then(m => m.TransactionModule) },
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/address/:address', loadChildren: () => import('app/modules/explorer/address/address.module').then(m => m.AddressModule) },
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/address/:address/:filterAddress', loadChildren: () => import('app/modules/explorer/address/address.module').then(m => m.AddressModule) },
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/mempool', loadChildren: () => import('app/modules/explorer/mempool/mempool.module').then(m => m.MempoolModule) },
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/orphans', loadChildren: () => import('app/modules/explorer/orphans/orphans.module').then(m => m.OrphansModule) },
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/contract-transaction/:transaction', loadChildren: () => import('app/modules/explorer/contract-transaction/contract-transaction.module').then(m => m.ContractTransactionModule) },
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/contract-address/:address', loadChildren: () => import('app/modules/explorer/contract-address/contract-address.module').then(m => m.ContractAddressModule) },
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/explorer/contract-code/:address', loadChildren: () => import('app/modules/explorer/contract-code/contract-code.module').then(m => m.ContractCodeModule) },
        ]
    },


    // insight routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/insight', loadChildren: () => import('app/modules/insight/insight.module').then(m => m.InsightModule) },
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/insight/richlist', loadChildren: () => import('app/modules/insight/richlist/richlist.module').then(m => m.RichlistModule) },
        ]
    },

    // network routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/network', loadChildren: () => import('app/modules/network/network.module').then(m => m.NetworkModule) },
        ]
    },
    // api routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/api', loadChildren: () => import('app/modules/chainAPI/chainAPI.module').then(m => m.ChainAPIModule) },
        ]
    },
    // about routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            chain: InitialDataResolver,
        },
        children: [
            { path: ':chain/about', loadChildren: () => import('app/modules/about/about.module').then(m => m.AboutModule) },
        ]
    },
    // error routes
    {
        path: 'error', children: [
            { path: '404', loadChildren: () => import('app/modules/errorpage/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '500', loadChildren: () => import('app/modules/errorpage/error-500/error-500.module').then(m => m.Error500Module) }
        ]
    },
    // 404 & Catch all
    { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/errorpage/error-404/error-404.module').then(m => m.Error404Module) },
    { path: '**', redirectTo: '404-not-found' }


];
