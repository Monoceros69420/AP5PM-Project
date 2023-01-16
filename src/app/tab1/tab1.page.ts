import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

	movies: any[] = [];
	currentPage = 1;
	imageBaseUrl = environment.images;
	searchTerm!: string;
	watchlist = [];

	constructor(private movieService: MovieService, private loadingCtrl: LoadingController, private routeM: Router, private dataService: DataService) { }

	ngOnInit() {
		this.loadMovies();
		this.loadData();
	}

	async loadMovies(event?: InfiniteScrollCustomEvent) {
		const loading = await this.loadingCtrl.create({
			message: 'Loading...',
			spinner: 'bubbles',
		});
		await loading.present();

		this.movieService.getTopRatedMovies(this.currentPage).subscribe(res => {
			loading.dismiss();
			this.movies.push(...res.results);
			console.log(res);

			event?.target.complete();
			if(event) {
				event.target.disabled = res.total_pages === this.currentPage;
			}
		});
	}
	
	loadMore(event: InfiniteScrollCustomEvent) {
		this.currentPage++;
		this.loadMovies(event);
	}

	openWatchlist() {
		this.routeM.navigate([`/watchlist`]);
	}

	async loadData() {
		this.watchlist = await this.dataService.getData();
	}

}
