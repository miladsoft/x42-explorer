/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
    constructor(private updates: SwUpdate, private snackBar: MatSnackBar) {
        // Listen for the 'VERSION_READY' event to know when an update is available
        const updatesAvailable = this.updates.versionUpdates.pipe(
          filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
          map(event => ({
            type: 'UPDATE_AVAILABLE',
            current: event.currentVersion,
            available: event.latestVersion,
          }))
        );

        updatesAvailable.subscribe((event) => {
          this.showAppUpdateAlert();
        });
      }
  showAppUpdateAlert() {
    const sb = this.snackBar.open('App Update available!', 'update', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    sb.onAction().subscribe(() => {
      this.doAppUpdate();
    });
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
