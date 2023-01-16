import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';
import { MovieService } from '../services/movie.service';

@Component({
	selector: 'app-watchlist',
	templateUrl: './watchlist.page.html',
	styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {

	movie: any = null;
	imageBaseUrl = environment.images;
	watchlist: any[] = [];

	constructor(private movieService: MovieService, private routeM: Router, private dataService: DataService) { 
		this.loadData();
	}

	ngOnInit() {
		this.getWatchlistDetails();	
	}

	getWatchlistDetails() {
		if(this.watchlist.length != 0){
			this.movieService.getMovieDetails(this.movie.id).subscribe(res => {
				this.movie = res;
			})
		}
	}

	openMovieDetails(movieid: string) {
		this.movieService.getMovieDetails(movieid).subscribe(res => {
			this.movie = res;
		})
		this.routeM.navigate([`/tabs/tab1/${movieid}`]);
	}

	async loadData() {
		this.watchlist = await this.dataService.getData();
	}

	async removeItem(index: number) {
		this.dataService.removeItem(index);
		this.watchlist.splice(index, 1);
	}

}
