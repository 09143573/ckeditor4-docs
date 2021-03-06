/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Component } from '@angular/core';

interface ComponentEvent {
	name: string;
	counter: number;
	message: string;
}

@Component( {
	selector: 'app-events',
	templateUrl: './events.component.html'
} )
export class EventsComponent {
	public isReadOnly = false;

	public isHidden = false;

	public isRemoved = false;

	public componentEvents: ComponentEvent[] = [];

	clearEventsLog(): void {
		this.componentEvents.length = 0;
	}

	onReady(): void {
		this.saveEvent( 'ready' );
	}

	onChange(): void {
		this.saveEvent( 'changed' );
	}

	onFocus(): void {
		this.saveEvent( 'focused' );
	}

	onBlur(): void {
		this.saveEvent( 'blurred' );
	}

	private saveEvent( eventName: string ): void {
		const events = this.componentEvents;
		let message = `Editor ${ eventName === 'changed' ? 'has' : 'is' } ${ eventName }`;

		if ( events.length && events[ 0 ].name === eventName ) {
			events[ 0 ].counter++;
		} else {
			events.unshift( {
				name: eventName,
				counter: 1,
				message: message
			} );
		}
	}
}
