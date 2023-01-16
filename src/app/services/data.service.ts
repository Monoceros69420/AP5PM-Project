import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

const STORAGE_KEY = 'mywatchlist';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(private storage: Storage) { 
		this.init();
	}

	async init() {
		await this.storage.create();
	}

	getData() {
		return this.storage.get(STORAGE_KEY) || [];
	}

	async addData(item: any) {
		const storedData = await this.storage.get(STORAGE_KEY) || [];
		const index = storedData.findIndex((object: any)=> object.id === item.id)

		if(index === -1) {
			storedData.push(item);
		}

		return this.storage.set(STORAGE_KEY, storedData);
	}

	async removeItem(index: number) {
		const storedData = await this.storage.get(STORAGE_KEY) || [];
		storedData.splice(index, 1);
		return this.storage.set(STORAGE_KEY, storedData);
	}

}
