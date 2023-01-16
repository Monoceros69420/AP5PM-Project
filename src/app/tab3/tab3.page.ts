import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ActorService } from 'src/app/services/actor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

	actors: any[] = [];
	currentPage = 1;
	imageBaseUrl = environment.images;
	searchTerm!: string;

	constructor(private actorService: ActorService,	private loadingCtrl: LoadingController) { }

	ngOnInit() {
		this.loadActors();
	}

	async loadActors(event?: InfiniteScrollCustomEvent) {
		const loading = await this.loadingCtrl.create({
			message: 'Loading...',
			spinner: 'bubbles',
		});
		await loading.present();

		this.actorService.getTopRatedActors(this.currentPage).subscribe(res => {
			loading.dismiss();
			this.actors.push(...res.results);
			console.log(res);

			event?.target.complete();
			if(event) {
				event.target.disabled = res.total_pages === this.currentPage;
			}
		});
	}

	loadMore(event: InfiniteScrollCustomEvent) {
		this.currentPage++;
		this.loadActors(event);
	}

}
