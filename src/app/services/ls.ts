import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	get(key: string) {
		return JSON.parse(localStorage.getItem(key) as string);
	}

	set(key: string, value: any) {
		return localStorage.setItem(key, JSON.stringify(value));
	}
}