import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from 'src/app/services/actor.service';
import { environment } from 'src/environments/environment';
import { MovieService } from '../services/movie.service';

@Component({
	selector: 'app-tab4',
	templateUrl: './tab4.page.html',
	styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
	credits: any = null;
	actor: any = null;
	movie: any = null;
	imageBaseUrl = environment.images;
	search: any;
	currentActor = this.route.snapshot.paramMap.get('id') as string; 

	constructor(private route: ActivatedRoute, private routeM: Router, private movieService: MovieService, private actorService: ActorService) { }

	ngOnInit() {
		this.getCred();
		this.actorService.getActorDetails(this.currentActor).subscribe(res => {
			console.log(res);
			this.actor = res;
		})
	}

	async getCred() {
		this.actorService.getMovieCredits(this.currentActor).subscribe(res => {
			this.credits = res;
			console.log(res);  
		})
	}

	openKnownFor(movieid: string) {
		this.movieService.getMovieDetails(movieid).subscribe(res => {
			this.movie = res;
		})
		this.routeM.navigate([`/tabs/tab1/${movieid}`]);
	}

}
