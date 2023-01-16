import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
	movie: any = null;
	zipped: boolean = true;
	imageBaseUrl = environment.images;
	watchlist: any[] = [];

	constructor(private route: ActivatedRoute, private movieService: MovieService, private dataService: DataService) { }

	ngOnInit() {
		this.loadData();
		this.currentMovieDetail();
	}

	currentMovieDetail() {
		const id = this.route.snapshot.paramMap.get('id') as string;
		this.movieService.getMovieDetails(id).subscribe(res => {
			console.log(res);
			this.movie = res;
		})
	}

	openHomepage() {
		window.open(this.movie.homepage);
	}

	async addData() {
		await this.dataService.addData(this.movie);
		this.loadData();
		console.log(this.movie);
	}

	watchlistButton() {
		if(this.zipped === false) {
			this.zipped = true;
			this.removeItem(this.watchlist.indexOf(this.movie.id));
		} else {
			this.zipped = false;
			this.addData()
		}
	}

	async loadData() {
		this.watchlist = await this.dataService.getData();
	}

	async removeItem(index: number) {
		this.dataService.removeItem(index);
		this.watchlist.splice(index, 1);
	}

}
